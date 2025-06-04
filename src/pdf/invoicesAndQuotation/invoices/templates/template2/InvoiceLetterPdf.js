import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { calcFooterHeight, calcHeaderHeight } from './utils/documentHeightCalculator.js'
import { buildHeader } from './builders/header.js'
import { buildContent } from './builders/content.js'
import { buildFooter } from './builders/footer.js'

pdfMake.vfs = pdfFonts.vfs;

export const generateInvoiceLetterPdf = async (biz, d) => {
    const images = {};

    if (biz.logoUrl) {
        try {
            images.logo = biz.logoUrl;
        } catch (error) {
            console.warn('❌ Logo download failed:', error.message);
        }
    }

    const top = calcHeaderHeight(biz, d);
    const bottom = calcFooterHeight(biz, d);
    const docDefinition = {
        images,
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
        footer: buildFooter(biz, d),
    }
    try {
        const base64 = await new Promise((res, rej) =>
            pdfMake.createPdf(docDefinition).getBase64(res, rej));
        return base64;
    } catch (error) {
        console.error('❌ PDF creation failed:', error);
        throw error;
    }
}