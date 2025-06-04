import PdfPrinter from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { calcFooterHeight, calcHeaderHeight } from './utils/documentHeightCalculator'
import { buildHeader } from './builders/header'
import { buildContent } from './builders/content'
import { buildFooter } from './builders/footer'

pdfMake.vfs = pdfFonts.vfs;

const printer = new PdfPrinter(fonts)

export const generateQuotationPdf = async (req) => {
    const { business: biz, data: d } = req.data;

    const images = {}
    if (biz.logoUrl) {
      try {
        images.logo = biz.logoUrl;
      } catch (err) {
        console.warn('❌ Logo download failed:', err.message)
      }
    }

    const top = calcHeaderHeight(biz, d)
    const bottom = calcFooterHeight(d)
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [32, top, 32, bottom],
        defaultStyle: { font: 'Roboto', fontSize: 10, lineHeight: 1.15 },
        styles: {
            title: { fontSize: 14, bold: true, margin: [0, 0, 0, 6] },
            headerInfo: { fontSize: 11, margin: [0, 1, 0, 1] },
            tableHeader: { bold: true, fontSize: 11, color: 'white' },
            separator: { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1, lineColor: '#e0e0e0' }] },
            totalsLabel: { bold: true },
            totalsValue: { bold: true, alignment: 'right' }
        },
        header: buildHeader(biz, d, images),
        content: buildContent(d),
        footer: buildFooter(d),
        images
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    const chunks = []
    return new Promise(res => {
        pdfDoc.on('data', c => chunks.push(c))
        pdfDoc.on('end', () => res(Buffer.concat(chunks).toString('base64')))
        pdfDoc.end()
    })
}