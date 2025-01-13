
import * as antd from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { Receipt } from '../../../pages/checkout/Receipt';

// import { useGetWarehouseData } from '../../../../hooks/warehouse/useGetWarehouseData';
// import { fbFixProductsWithoutId } from '../../../../firebase/products/fbFixProductsWithoutId';
// import { GridVirtualizerFixed } from './ProductList';
import PurchaseManagement from '../../../pages/OrderAndPurchase/PurchaseManagement/PurchaseManagement';
import styled from 'styled-components';
import FileProcessor from './RncFileUpload';
import RncSearch from './RncSearch';
import OrderManagement from '../../../pages/OrderAndPurchase/OrderManagement/OrderManagement';

const { FloatButton } = antd


export const Prueba = () => {
  const user = useSelector(selectUser)


  return (
    <Container>
       {/* <FileProcessor />
      <RncSearch />  */}

      {/* <GridVirtualizerFixed /> */}
      <OrderManagement />
      {/* <Receipt data={invoice} ignoreHidden={true} />  */}
      {/* <FloatButton onClick={handleSubmit}>Corregir productos sin Id</FloatButton> */}
    </Container>
  )
}

const Container = styled.div`

`