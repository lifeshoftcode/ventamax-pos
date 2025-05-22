import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { useState } from 'react';
import { testInvoiceFunction } from '../../../../firebase/functions/invoice/processInvoice';

export const Prueba = () => {
  const user = useSelector(selectUser)
  const [processState, setProcessState] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [testData, setTestData] = useState('');
  const [functionResponse, setFunctionResponse] = useState(null);
  
  // Función para manejar el cambio de fecha única
  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log("Fecha seleccionada:", date);
  };
  
  // Función para manejar el cambio de rango de fechas
  const handleRangeChange = (range) => {
    setDateRange(range);
    console.log("Fecha inicio:", range.start);
    console.log("Fecha fin:", range.end);
  };

  const handleProcessInvoice = async () => {
    try {
      setFunctionResponse(null); // Reset previous response
      const result = await testInvoiceFunction(testData);
      console.log("Respuesta de la función:", result);
      setFunctionResponse(result);
    } catch (error) {
      console.error("Error al llamar la función:", error);
      setFunctionResponse({
        error: true,
        message: error.message || 'Error al procesar la solicitud'
      });
    }
  }    
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Encabezado con estilo de vidrio esmerilado */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-xl p-6 flex items-center space-x-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Consola de Pruebas</h1>
            <p className="text-gray-500 text-sm">Firebase Cloud Functions</p>
          </div>
        </div>
      </div>
      
      {/* Contenedor principal */}
      <div className="max-w-4xl mx-auto grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Panel de información de usuario */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden lg:col-span-1">
          <div className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <div className="flex items-center">
              <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="ml-3 text-xl font-bold text-blue-800">Información del Usuario</h2>
            </div>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                <dd className="mt-1 text-lg font-semibold text-gray-900">{user?.displayName || 'No disponible'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">ID de Usuario</dt>
                <dd className="mt-1 text-sm text-gray-900 break-all">{user?.uid || 'No disponible'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">ID de Negocio</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.businessID || 'No disponible'}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-sm font-medium text-gray-500">Nombre de Negocio</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.businessName || 'No disponible'}</dd>
              </div>
            </dl>
          </div>
        </div>
      
        {/* Panel de comandos y respuestas */}
        <div className="lg:col-span-2 space-y-6">
          {/* Panel de entrada */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-emerald-50 to-green-100 border-b">
              <div className="flex items-center">
                <div className="bg-emerald-500 rounded-full w-10 h-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="ml-3 text-xl font-bold text-emerald-800">Cloud Function Tester</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label htmlFor="testData" className="block text-sm font-medium text-gray-700 mb-2">
                  Datos para enviar al backend
                </label>
                <textarea 
                  id="testData"
                  rows="3" 
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ingresa JSON, texto u otro formato de datos para enviar..." 
                  value={testData} 
                  onChange={(e) => setTestData(e.target.value)}
                ></textarea>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleProcessInvoice} 
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Enviar al backend
                </button>
                <button 
                  onClick={() => setTestData('')} 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
          
          {/* Panel de respuesta */}
          {functionResponse && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-purple-50 to-purple-100 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="ml-3 text-xl font-bold text-purple-800">Respuesta del Backend</h2>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${functionResponse.error ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {functionResponse.error ? 'Error' : 'Éxito'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-72 border border-gray-200">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap">{JSON.stringify(functionResponse, null, 2)}</pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(JSON.stringify(functionResponse, null, 2));
                    }} 
                    className="inline-flex items-center px-3 py-1 border border-purple-300 text-sm leading-5 font-medium rounded-md text-purple-700 bg-white hover:text-purple-500 focus:outline-none focus:border-purple-300 focus:ring focus:ring-purple-200 active:text-purple-800 active:bg-purple-50 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                    </svg>
                    Copiar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Ventamax © {new Date().getFullYear()} - Herramienta para desarrolladores
        </p>
      </footer>
    </div>
  )
}

/* Removed styled components in favor of Tailwind CSS classes directly in JSX */