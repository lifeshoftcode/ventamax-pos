import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input, DatePicker, Form } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, SwapOutlined, ClearOutlined, SearchOutlined } from "@ant-design/icons";
import { useListenProductsStockByLocation } from '../../../../../../../../firebase/warehouse/productStockService';
import DateUtils from '../../../../../../../../utils/date/dateUtils';
import { ProductMovementModal } from './ProductMovementModal';
import { AdvancedTable } from '../../../../../../../templates/system/AdvancedTable/AdvancedTable';

const Container = styled.div`
  margin-bottom: 24px;
  min-height: 400px;
  display: grid;
  grid-template-rows: min-content min-content 1fr;

  border-radius: 8px;
  background-color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 1em;
  font-size: 1.1em;
  font-weight: 600;
`;

const TitleSection = styled.div`
/* padding: 1em 0; */
`;

const SearchContainer = styled(Form)`
  display: grid;
  grid-template-columns: min-content min-content min-content;
  align-items: end;
  gap: 16px;
  /* margin-bottom: 24px; */
`;

const SearchInput = styled(Input)`
  width: 300px;

  .ant-input-prefix {
    color: #8c8c8c;
    margin-right: 8px;
  }
`;

const StyledDateRangePicker = styled(DatePicker.RangePicker)`
  width: 230px;
`;

const ClearButton = styled(Button)`
  background: #f5f5f5;
  border: 1px solid #d9d9d9;
  
  &:hover {
    background: #e8e8e8;
    border-color: #d9d9d9;
    color: #ff4d4f;
  }
`;

const DateRangeLabel = styled.label`
  font-weight: 600;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const InventoryTable = ({ currentNode, searchTerm, setSearchTerm, setDateRange, location, warehouseData }) => {
  const { data: productsStock, loading } = useListenProductsStockByLocation(location);
  const [moveModalVisible, setMoveModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

  const handleMove = (record) => {
    setSelectedProduct(record); // Pass the entire record instead of just the product name
    setMoveModalVisible(true);
  };

  const handleMoveSubmit = (values) => {
    console.log('Movement values:', values);
    // Implement your movement logic here
    setMoveModalVisible(false);
  };

  const handleDateRangeChange = (dates) => {
    setDateFilter(dates);
    setDateRange(dates);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDateFilter(null);
    setDateRange(null);
  };

  const columns = [
    {
      Header: "Producto",
      accessor: "productName",
      minWidth: "200px",
    },
    {
      Header: "Cantidad Existente",
      accessor: "quantity",
      align: "right",
      minWidth: "100px",
    },
    {
      Header: "Batch",
      accessor: "batch",
      minWidth: "150px",
    },
    {
      Header: "Fecha de Vencimiento",
      accessor: "expiryDate",
      minWidth: "150px",
    },
    {
      Header: "Acciones",
      accessor: "actions",
      align: "right",
      minWidth: "150px",
      cell: ({ value }) => (
        <ActionContainer>
          <Button icon={<SwapOutlined />} size="small" onClick={() => handleMove(value)} />
          {/* <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" /> */}
          {/* <Button icon={<DeleteOutlined />} size="small" /> */}
        </ActionContainer>
      ),
    },
  ];

  const inventoryData = productsStock
    ? productsStock
      .filter(stock => {
        // Filtro por término de búsqueda
        if (searchTerm) {
          const productNameMatch = stock.productName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
          const batchMatch = stock.batch?.toString().toLowerCase().includes(searchTerm.toLowerCase()) || false;
          if (!productNameMatch && !batchMatch) return false;
        }

        // Filtro por rango de fechas
        if (dateFilter && dateFilter[0] && dateFilter[1]) {
          const startDate = dateFilter[0].startOf('day').valueOf();
          const endDate = dateFilter[1].endOf('day').valueOf();
          
          // Si no hay fecha de vencimiento y hay filtro de fechas, no mostrar
          if (!stock.expirationDate) return false;
          
          const expirationDate = stock.expirationDate;
          return expirationDate >= startDate && expirationDate <= endDate;
        }

        return true;
      })
      .map((stock) => ({
        id: stock.id,           // Asegurarnos de incluir el id del productStock
        key: stock.id,
        productName: stock.productName || 'Producto sin nombre', // Changed from product to productName
        productId: stock.productId || '',
        quantity: stock.stock || 0,
        batch: stock.batchNumberId || 'N/A',
        actions: stock, // Pass the entire stock object
        expiryDate: stock?.expirationDate ? DateUtils.convertMillisToISODate(stock?.expirationDate) : 'N/A',
        // Incluir todos los campos originales que necesitemos
        ...stock  // Opcionalmente, incluir todos los campos originales
      }))
    : [];



  return (
    <>
      <Container>
        <TitleSection>
          <Title>Gestión de Inventario</Title>
        </TitleSection>
        <SearchContainer layout="vertical">
          <Form.Item>
            <SearchInput
              prefix={<SearchOutlined />}
              placeholder="Buscar por Producto o Batch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Fecha de Vencimiento:">
            <StyledDateRangePicker
              onChange={handleDateRangeChange}
              placeholder={["Inicio", "Fin"]}
              value={dateFilter}
              format="DD/MM/YYYY"
            />
          </Form.Item>
          <Form.Item>
            <ClearButton 
              icon={<ClearOutlined />}
              onClick={handleClearFilters}
              title="Limpiar filtros"
            >
              Limpiar
            </ClearButton>
          </Form.Item>
        </SearchContainer>

        <AdvancedTable
          columns={columns}
          data={inventoryData}
          loading={loading}
          numberOfElementsPerPage={8}
          emptyText="No hay registros para mostrar"
        />
      </Container>

      <ProductMovementModal
        visible={moveModalVisible}
        onCancel={() => setMoveModalVisible(false)}
        onOk={handleMoveSubmit}
        product={selectedProduct}
        currentNode={currentNode}
      />
    </>
  );
};
