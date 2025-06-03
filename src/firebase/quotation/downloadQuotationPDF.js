import { httpsCallable } from "firebase/functions"
import { functions } from "../firebaseconfig"
import printJS from 'print-js';
// import { generateInvoiceLetterPdf, generateInvoiceLetterPdfNoLogo } from "../../pdf/invoices/templates/template2-pdf-lib/InvoiceLetterPdf";
import { generateInvoiceLetterPdf } from "../../pdf/invoicesAndQuotation/invoices/templates/template2/InvoiceLetterPdf";

export function sanitizeNumbers(obj) {
  return JSON.parse(JSON.stringify(obj, (k, v) =>
    (typeof v === 'number' && !Number.isFinite(v)) ? null : v
  ));
}

export async function downloadQuotationPdf(business, data, onDialogClose) {
    try {
        const fn = httpsCallable(functions, 'quotationPdf')
        const { data: base64 } = await fn({ business, data })
        printJS({ 
            printable: base64, 
            type: 'pdf', 
            base64: true, 
            showModal: true, 
            onPrintDialogClose: onDialogClose
        });
    } catch (e) {
        console.error('PDF generation failed', e.message);
        console.error(e.stack);
    }
}

export async function downloadInvoiceLetterPdf(business, data, onDialogClose) {
    try {
        console.log('business', business);
        console.log('data', data);
        
        // Intentar generar PDF con logo
        console.log('🔄 Intentando generar PDF...');
        const base64 = await generateInvoiceLetterPdf(business, data);
        
        printJS({ 
            printable: base64, 
            type: 'pdf', 
            base64: true,
            showModal: true,
            onPrintDialogClose: onDialogClose
        });
    } catch (e) {
        console.error('❌ PDF generation with logo failed:', e.message);
        console.error(e.stack);
    }
}