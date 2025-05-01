import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { useState } from 'react';
import styled from 'styled-components';
import { testInvoiceFunction } from '../../../../firebase/functions/invoice/processInvoice';
import { Button, Input, Space, Card, Divider } from 'antd';

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
    <Container>
      <h1>Prueba de Cloud Functions</h1>
      <Card title="Información del Usuario" style={{ marginBottom: '20px' }}>
        <p><strong>Nombre:</strong> {user?.displayName}</p>
        <p><strong>UID:</strong> {user?.uid}</p>
        <p><strong>Business ID:</strong> {user?.businessID}</p>
        <p><strong>Business Name:</strong> {user?.businessName}</p>
      </Card>

      <Card title="Probar Cloud Function">
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input 
            placeholder="Ingresa datos para enviar al backend" 
            value={testData} 
            onChange={(e) => setTestData(e.target.value)}
            onPressEnter={handleProcessInvoice}
          />
          <Button type="primary" onClick={handleProcessInvoice}>
            Enviar datos al backend
          </Button>
        </Space>
      </Card>

      {functionResponse && (
        <Card title="Respuesta del Backend" style={{ marginTop: '20px' }}>
          <pre>{JSON.stringify(functionResponse, null, 2)}</pre>
        </Card>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const Section = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  background-color: white;
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #333;
  }
  
  p {
    margin-bottom: 15px;
    color: #666;
  }
`

const SelectedValue = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.9rem;
`