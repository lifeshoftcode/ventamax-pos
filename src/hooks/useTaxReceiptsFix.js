import { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/userSlice';
import { db } from '../firebase/firebaseconfig';

/** 8 dígitos para B, 10 para E */
const defaultLength = (serie) => (serie === 'B' ? 8 : 10);

export function useTaxReceiptsFix() {
  const [taxReceipts, setTaxReceipts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const user       = useSelector(selectUser);
  const businessID = user?.businessID;

  useEffect(() => {
    if (!businessID) {
      console.warn('useTaxReceiptsFix: no businessID, no suscripción.');
      setLoading(false);
      return;
    }

    setLoading(true);
    const ref = collection(db, 'businesses', businessID, 'taxReceipts');

    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      // 1) Primer pase: aseguramos defaults y convertimos sequence a número
      await Promise.all(snapshot.docs.map(async (docSnap) => {
        const full = docSnap.data();
        const raw  = full.data || {};
        const updates = {};

        // id por defecto
        if (raw.id !== docSnap.id) {
          updates['data.id'] = docSnap.id;
        }
        // disabled por defecto
        if (typeof raw.disabled !== 'boolean') {
          updates['data.disabled'] = false;
        }
        // sequenceLength por defecto
        if (typeof raw.sequenceLength !== 'number') {
          updates['data.sequenceLength'] = defaultLength(raw.type);
        }
        // convertir sequence string → número
        if (typeof raw.sequence === 'string') {
          const seqNum = parseInt(raw.sequence, 10) || 0;
          updates['data.sequence'] = seqNum;
        }

        if (Object.keys(updates).length > 0) {
          await updateDoc(
            doc(db, 'businesses', businessID, 'taxReceipts', docSnap.id),
            updates
          );
        }
      }));

      // 2) Segundo pase: leemos ya con todos los campos en data.*
      const receipts = snapshot.docs.map((docSnap) => {
        const raw = docSnap.data().data;
        return {
          id:              raw.id,
          name:            raw.name,
          type:            raw.type,
          serie:           raw.serie,
          sequence:        raw.sequence,         // ahora número
          sequenceLength:  raw.sequenceLength,
          increase:        raw.increase,
          quantity:        raw.quantity,
          disabled:        raw.disabled
        };
      });

      setTaxReceipts(receipts);
      setLoading(false);
    },
    (err) => {
      console.error('Snapshot error:', err);
      setError(err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [businessID]);

  /** Incrementa y persiste data.sequence (número) en Firestore */
  const updateSequence = async (docId, delta = 1) => {
    if (!businessID) {
      console.warn('updateSequence: no businessID');
      return;
    }
    try {
      const docRef = doc(db, 'businesses', businessID, 'taxReceipts', docId);
      const snap   = await getDoc(docRef);
      if (!snap.exists()) throw new Error('Receipt not found');

      const raw       = snap.data().data || {};
      const current   = typeof raw.sequence === 'number'
                        ? raw.sequence
                        : parseInt(raw.sequence, 10) || 0;
      const nextSeq   = current + delta;

      // Guardamos solo el número
      await updateDoc(docRef, {
        'data.sequence': nextSeq
      });
      // onSnapshot refrescará automáticamente
    } catch (err) {
      console.error('Error updating sequence:', err);
      setError(err);
    }
  };

  /** Devuelve el NCF completo con padding de ceros */
  const formatNCF = ({ type, serie, sequence, sequenceLength }) =>
    type + serie + String(sequence).padStart(sequenceLength, '0');

  return { taxReceipts, loading, error, updateSequence, formatNCF };
}
