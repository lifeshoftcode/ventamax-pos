import ExcelJS from 'exceljs';

const exportToExcel = async (data, sheetName, fileName, onBeforeExport = null) => {
  try {
    console.log('🚀 Iniciando generación de Excel...');
    
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    const columns = Object.keys(data[0]);
    worksheet.columns = columns.map((column) => ({ header: column, key: column }));

    data.forEach((item) => {
      worksheet.addRow(item);
    });
    
    // Si se proporciona un callback, ejecutarlo para modificar la hoja antes de exportar
    if (onBeforeExport && typeof onBeforeExport === 'function') {
      console.log('🎨 Aplicando estilos profesionales...');
      onBeforeExport(worksheet, data, columns);
      console.log('✅ Estilos aplicados exitosamente');
    } else {
      console.log('⚠️ No se proporcionó callback o no es una función');
    }

    console.log('📄 Generando archivo Excel...');
    const buffer = await workbook.xlsx.writeBuffer();
    
    console.log('💾 Iniciando descarga...');
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    
    // Limpiar el URL después de un pequeño delay
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    console.log('✅ Excel exportado exitosamente');
    return { success: true };
  } catch (error) {
    console.error('❌ Error al exportar Excel:', error);
    throw error;
  }
};

export default exportToExcel;
