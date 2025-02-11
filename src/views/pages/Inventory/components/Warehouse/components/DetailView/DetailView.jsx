import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectWarehouse } from "../../../../../../../features/warehouse/warehouseSlice";
import { BreadcrumbNav } from './components/BreadcrumbNav';
import { InventoryTable } from './components/InventoryTable';
import { MovementsTable } from './components/MovementsTable';
import { openProductStock } from "../../../../../../../features/productStock/productStockSlice";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import InventoryMenu from "./InventoryMenu";

const DetailContainer = styled.div`
  flex: 1;
  padding: 20px;
  width: 100%;
`;

const DetailTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5em;
  color: #2c3e50;
`;

const DetailContent = styled.div`
  margin-top: 10px;
  color: #333;
  font-size: 1em;
`;

export const DetailView = () => {
  const { 
    selectedWarehouse, 
    selectedShelf, 
    selectedRowShelf, 
    selectedSegment, 
    selectedProduct,
    breadcrumbs 
  } = useSelector(selectWarehouse);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const {shelfId} = useParams();

  // Determinar el nodo actual basado en las selecciones
  const currentNode = selectedProduct || selectedSegment || selectedRowShelf || selectedShelf || selectedWarehouse || null;

  // Construir la cadena de ubicación
  const location = [
    selectedWarehouse?.id,
    selectedShelf?.id,
    selectedRowShelf?.id,
    selectedSegment?.id,
    selectedProduct?.id
  ].filter(Boolean).join('/');

  return (
    <div style={{ maxWidth: "1200px", width: '100%', margin: "0 auto", padding: " 0px 24px" }}>
      <BreadcrumbNav breadcrumbs={breadcrumbs} />
  

      {!currentNode ? (
        <DetailContent>Selecciona un elemento para ver los productos</DetailContent>
      ) : (
        <>
       
          <InventoryTable 
            currentNode={currentNode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setDateRange={setDateRange}
            location={location} // Pasar la cadena de ubicación
          />
          <MovementsTable location={location} /> {/* Asegurar que location se pasa correctamente */}
        </>
      )}
    </div>
  );
};

export default DetailView;
