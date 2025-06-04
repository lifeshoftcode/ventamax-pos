import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseconfig';
const items = [
  {
      "warehouseId": "53swRgHW-61hnDCFy_rIf"
  },
  {
      "warehouseId": "53swRgHW-61hnDCFy_rIf",
      "shelfId": "7W2jXNB2NyxxUXZ6QCdGN",
      "rowShelfId": "dYELrOH0x8Yuh11dteBAr",
      "segmentId": "O8P727_nkw2_B8WFCZ8hk"
  },
  {
      "warehouseId": "VHQn9ErkMcFUetarA8mpa"
  },
  {
      "warehouseId": "NFtgFE2jA84sDQNew89Su"
  },
  {
      "warehouseId": "53swRgHW-61hnDCFy_rIf",
      "shelfId": "7W2jXNB2NyxxUXZ6QCdGN"
  },
  {
      "warehouseId": "53swRgHW-61hnDCFy_rIf",
      "shelfId": "7W2jXNB2NyxxUXZ6QCdGN",
      "rowShelfId": "dYELrOH0x8Yuh11dteBAr"
  },
  {
      "warehouseId": "Uds1FvnWTRbEiZP4diPuM"
  }
]
export const useGetWarehouseData = () => {
  const user = useSelector(selectUser);
  const memoizedUser = useMemo(() => user, [user?.uid, user?.businessID]); // Fix memoization
  // Remove unnecessary memoization of constant array
  
  const [data, setData] = useState({
    warehouses: [],
    shelves: [],
    rows: [],
    segments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (user, items) => {
    if (!user?.businessID || items.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Batch the operations for better performance
      const promises = items.map(async (item) => {
        let docPath = `businesses/${user.businessID}/warehouses/${item.warehouseId}`;
        
        if (item.shelfId) {
          docPath += `/shelves/${item.shelfId}`;
          if (item.rowShelfId) {
            docPath += `/rows/${item.rowShelfId}`;
            if (item.segmentId) {
              docPath += `/segments/${item.segmentId}`;
            }
          }
        }

        const docRef = doc(db, docPath);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return {
            data: docSnap.data(),
            type: item.segmentId ? 'segment' : 
                  item.rowShelfId ? 'row' : 
                  item.shelfId ? 'shelf' : 'warehouse'
          };
        }
        return null;
      });

      const results = await Promise.all(promises);
      
      const warehouses = [];
      const shelves = [];
      const rows = [];
      const segments = [];
      
      results.forEach(result => {
        if (result) {
          switch (result.type) {
            case 'segment':
              segments.push(result.data);
              break;
            case 'row':
              rows.push(result.data);
              break;
            case 'shelf':
              shelves.push(result.data);
              break;
            case 'warehouse':
              warehouses.push(result.data);
              break;
          }
        }
      });

      setData({ warehouses, shelves, rows, segments });
    } catch (error) {
      console.error("Error obteniendo documentos:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []); // fetchData doesn't depend on external values

  useEffect(() => {
    fetchData(memoizedUser, items);
  }, [memoizedUser, fetchData]);

  return { data, loading, error };
};
