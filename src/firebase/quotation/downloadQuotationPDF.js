import { httpsCallable } from "firebase/functions"
import { functions } from "../firebaseconfig"
import printJS from 'print-js';

export async function downloadQuotationPdf(business, data) {
    try {
        const fn = httpsCallable(functions, 'quotationPdf')
        const { data: base64 } = await fn({ business, data })
        printJS({ printable: base64, type: 'pdf', base64: true });

    } catch (e) {
        console.error('PDF generation failed', e)
    }
}

export async function downloadInvoiceLetterPdf(business, data) {
    console.log(business, data);
    const { user, seller, ...restData } = data;
    const payload = {
        business,
        data: restData,
    };
    try {
        const fn = httpsCallable(functions, 'invoiceLetterPdf')
        const { data: base64 } = await fn(payload);
        printJS({ printable: base64, type: 'pdf', base64: true });

        console.log('Invoice letter PDF generated successfully.');

    } catch (e) {
        console.error('PDF generation failed', e.message);
        console.error(e.stack);
    }
}