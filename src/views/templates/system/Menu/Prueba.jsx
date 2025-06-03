import { useSelector } from 'react-redux';
import { selectUser } from '../../../../features/auth/userSlice';
import { useState } from 'react';
import { Button } from 'antd';
import { backfillUserNumbers } from '../../../../firebase/Auth/fbBackfillUserNumbers';

export const Prueba = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  const handleClick = async () => {
    try {
      setLoading(true);
      const result = await backfillUserNumbers(user.businessID);
      console.log('Números de usuario rellenados:', result);
      setLoading(false);
    } catch (err) {
      console.error('Error rellenando números:', err);
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
nada uan
    </div>
  );
};