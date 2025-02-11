import * as antd from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { useState } from 'react';
import { ProcessViewer } from '../../../../components/ProcessViewer';
import styled from 'styled-components';
import { db } from '../../../../firebase/firebaseconfig';
import { collection, getDocs, query, writeBatch } from 'firebase/firestore';
import { fbInitializedProductInventory } from '../../../../firebase/products/fbInitializeProductInventory';
import { fbInitializedProductInventoryForAllBusinesses } from '../../../../firebase/products/fbInitializedProductInventoryForAllBusinesses';

const { FloatButton } = antd

const handleDeleteProducts = async (user) => {
  try {
    if (!user?.businessID) return;
    const productsRef = collection(db, `businesses/${user?.businessID}/products`);
    const querySnapshot = await getDocs(productsRef);

    if (querySnapshot.empty) {
      console.log("No hay productos para eliminar");
      return;
    }

    let batch = writeBatch(db);
    let deletedCount = 0;
    const batchLimit = 500; // Límite máximo de operaciones por batch

    querySnapshot.forEach(async (doc, index) => {
      batch.delete(doc.ref);
      deletedCount++;

      // Comprometer batch cada 500 operaciones
      if ((index + 1) % batchLimit === 0) {
        await batch.commit();
        batch = writeBatch(db); // Reiniciar batch
      }
    });

    // Comprometer las operaciones restantes
    if (deletedCount > 0) {
      await batch.commit();
    }

    console.log(`Se eliminaron ${deletedCount} productos exitosamente`);
  } catch (error) {
    console.error("Error eliminando productos: ", error);
    throw error; // Propagar el error para manejo superior
  }
};

export const Prueba = () => {
  const user = useSelector(selectUser)
  const [processState, setProcessState] = useState(null);

  const handleSubmit = async () => {
    try {
      // await fbInitializedProductInventory(user, setProcessState);
      await fbInitializedProductInventoryForAllBusinesses(setProcessState);
      // await handleDeleteProducts(user);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => setProcessState(null), 2000);
    }
  }

  return (
    <Container>
      {user?.businessID}
      {/* <FileProcessor />
      <RncSearch />  */}

      {/* <GridVirtualizerFixed /> */}
      {/* <OrderManagement /> */}
      {/* <Receipt data={invoice} ignoreHidden={true} />  */}
      prueba 2
      {processState && <ProcessViewer {...processState} />}
      <FloatButton onClick={handleSubmit}>Iniciar</FloatButton>
    </Container>
  )
}

const Container = styled.div`

`