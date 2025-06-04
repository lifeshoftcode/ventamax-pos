import { createExcelTemplate } from "../createExcelTemplate";
import { mapData } from "../mapData";
import { readExcelFile } from "../excelReader";
import { productHeaderMappings } from "./headerMappings";
import { transformConfig } from "./transformFunctions";
import { processMappedData } from "../processMappedData";
import { filterEssentialHeaders, createSelectedHeaders } from "./filterEssentialHeaders";

export const importProductData = async (file, language = 'en') => {
    if (!file) {
        console.error("No file selected.");
        return;
    }
    try {
        const fileData = await file.arrayBuffer();
        const data = await readExcelFile(fileData);
        console.log('Datos originales leídos:', data.sort((a, b) => a.Impuesto - b.Impuesto));
        const headerMapping = productHeaderMappings;

        const dataMapped = mapData({ data, headerMapping, transformConfig, language });

        const transformedData = processMappedData({
            dataMapped,
            transformConfig,
        })

        return transformedData;
    } catch (error) {
        console.error('Error al importar datos de productos:', error);
        throw error;
    }
};
// Función específica para generar una plantilla de productos en Excel
export const createProductTemplate = async (language = 'es', optionalFields = []) => {
    try {
        const headers = createSelectedHeaders(productHeaderMappings, language, optionalFields);
        console.log('Columnas seleccionadas:', headers);
        const fileName = `Plantilla_Productos_${language}.xlsx`;
        await createExcelTemplate(headers, fileName);
    } catch (error) {
        console.error('Error al crear la plantilla de productos:', error);
        throw error;
    }
};
