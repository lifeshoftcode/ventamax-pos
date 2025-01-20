import * as antd from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { Receipt } from '../../../pages/checkout/Receipt';
import { useState } from 'react';
import { ProcessViewer } from '../../../../components/ProcessViewer';

// import { useGetWarehouseData } from '../../../../hooks/warehouse/useGetWarehouseData';
// import { fbFixProductsWithoutId } from '../../../../firebase/products/fbFixProductsWithoutId';
// import { GridVirtualizerFixed } from './ProductList';
import PurchaseManagement from '../../../pages/OrderAndPurchase/PurchaseManagement/PurchaseManagement';
import styled from 'styled-components';
import FileProcessor from './RncFileUpload';
import RncSearch from './RncSearch';
import OrderManagement from '../../../pages/OrderAndPurchase/OrderManagement/OrderManagement';
import { fbInitializedProductInventory } from '../../../../firebase/products/fbInitializeProductInventory';

const { FloatButton } = antd


export const Prueba = () => {
  const user = useSelector(selectUser)
  const [processState, setProcessState] = useState(null);

  const handleSubmit = async () => {
    try {
      await fbInitializedProductInventory(user, setProcessState);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setProcessState(null), 2000);
    }
  }

  return (
    <Container>
      {/* <FileProcessor />
      <RncSearch />  */}

      {/* <GridVirtualizerFixed /> */}
      {/* <OrderManagement /> */}
      {/* <Receipt data={invoice} ignoreHidden={true} />  */}
      prueba
      {processState && <ProcessViewer {...processState} />}
      <FloatButton onClick={handleSubmit}>Iniciar</FloatButton>
    </Container>
  )
}

const Container = styled.div`

`