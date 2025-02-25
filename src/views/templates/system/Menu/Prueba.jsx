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
import { updateDoc } from 'firebase/firestore';
import { cleanInventoryData } from '../../../../firebase/inventoryDataCleaner/inventoryDataCleanerService';
import { InvoiceTemplate3 } from '../../../component/Invoice/templates/Invoicing/InvoiceTemplate3/InvoiceTemplate3';
import { InvoiceTemplate4 } from '../../../component/Invoice/templates/Invoicing/InvoiceTemplate4/InvoiceTemplate4';

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

const handleUpdateStockStatus = async (user, setProcessState) => {
  try {
    setProcessState({
      status: "Iniciando actualización de estados",
      progress: 0
    });

    const stockCollection = collection(db, `businesses/${user.businessID}/productsStock`);
    const querySnapshot = await getDocs(stockCollection);

    if (querySnapshot.empty) {
      setProcessState({
        status: "No hay productos para actualizar",
        progress: 100
      });
      return;
    }

    const totalDocs = querySnapshot.size;
    let batch = writeBatch(db);
    const batchLimit = 500;
    let counter = 0;
    let updatedCount = 0;

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      if (!data.hasOwnProperty("status")) {
        batch.update(doc.ref, { status: "active" });
        updatedCount++;
        counter++;

        setProcessState({
          status: `Actualizando productos: ${updatedCount}/${totalDocs}`,
          progress: Math.round((counter / totalDocs) * 100),
          currentProduct: {
            id: doc.id,
            name: data.name || 'Producto sin nombre',
            stock: data.stock || 0
          }
        });

        if (counter % batchLimit === 0) {
          await batch.commit();
          batch = writeBatch(db);
        }
      }
    }

    if (counter % batchLimit !== 0) {
      await batch.commit();
    }

    setProcessState({
      status: `Actualización completada. Se actualizaron ${updatedCount} productos`,
      progress: 100
    });

    console.log(`Se actualizaron ${updatedCount} productosStock exitosamente`);
  } catch (error) {
    console.error("Error actualizando productosStock: ", error);
    setProcessState({
      status: "Error en la actualización",
      progress: 100,
      error: true
    });
  }
};

const handleUpdateProductPrice = async (user, setProcessState) => {
  try {
    setProcessState({
      status: "Iniciando actualización de precios",
      progress: 0
    });

    const productsCollection = collection(db, `businesses/${user.businessID}/products`);
    const querySnapshot = await getDocs(productsCollection);

    if (querySnapshot.empty) {
      setProcessState({
        status: "No hay productos para actualizar",
        progress: 100
      });
      return;
    }

    const totalDocs = querySnapshot.size;
    let batch = writeBatch(db);
    const batchLimit = 500;
    let counter = 0;
    let updatedCount = 0;

    for (const doc of querySnapshot.docs) {
      const data = doc.data();
      // Verificar si tiene pricing.listPrice y actualizar pricing.price
      if (data.pricing?.listPrice) {
        batch.update(doc.ref, {
          'pricing.price': data.pricing.listPrice
        });

        updatedCount++;
        counter++;

        setProcessState({
          status: `Actualizando productos: ${updatedCount}/${totalDocs}`,
          progress: Math.round((counter / totalDocs) * 100),
          currentProduct: {
            id: doc.id,
            name: data.name || 'Producto sin nombre',
            pricing: {
              price: data.pricing.listPrice,
              listPrice: data.pricing.listPrice
            }
          }
        });

        if (counter % batchLimit === 0) {
          await batch.commit();
          batch = writeBatch(db);
        }
      }
    }

    if (counter % batchLimit !== 0) {
      await batch.commit();
    }

    setProcessState({
      status: `Actualización completada. Se actualizaron ${updatedCount} productos`,
      progress: 100
    });

    console.log(`Se actualizaron ${updatedCount} productos exitosamente`);
  } catch (error) {
    console.error("Error actualizando productos: ", error);
    setProcessState({
      status: "Error en la actualización",
      progress: 100,
      error: true
    });
  }
}

export const Prueba = () => {
  const user = useSelector(selectUser)
  const [processState, setProcessState] = useState(null);

  const handleSubmit = async () => {
    try {
      //  await fbInitializedProductInventory(user, setProcessState);
      // await fbInitializedProductInventoryForAllBusinesses(setProcessState);
      // await handleDeleteProducts(user);
      // await handleUpdateStockStatus(user, setProcessState);
      // await cleanInventoryData('7zydYrerx10N0Rg9vD2pQ')
      // await handleUpdateProductPrice(user, setProcessState);
      setProcessState({
        status: "Inventario limpiado exitosamente",
        progress: 100
      });
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
      <InvoiceTemplate3 />
      <InvoiceTemplate4 />
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