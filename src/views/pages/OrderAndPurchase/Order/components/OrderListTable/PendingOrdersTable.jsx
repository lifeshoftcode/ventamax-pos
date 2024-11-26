import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/auth/userSlice'
import { fbGetPendingOrders } from '../../../../../../firebase/order/fbGetPedingOrder'
import { convertMillisToDate } from '../../../../../../hooks/useFormatTime'
import { useFormatPrice } from '../../../../../../hooks/useFormatPrice'
import { getOrderConditionByID, getOrderStateByID } from '../../../../../../constants/orderAndPurchaseState'
import { StatusIndicatorDot } from '../StatusIndicatorDot/StatusIndicatorDot'
import { ActionsButtonsGroup } from '../../ListItem/ActionsButtonsGroup'
import { setNote } from '../../../../../../features/noteModal/noteModalSlice'
import { AdvancedTable } from '../../../../../templates/system/AdvancedTable/AdvancedTable'
import { Button, Tag } from 'antd'
import { DateTime } from 'luxon';
import { columns, filterConfig } from './tableConfig'

const calculatePaymentDate = (createdAt, conditionId) => {
  let daysToAdd = 0;
  switch (conditionId) {
    case 'condition_0001': // Contado, asumimos pago inmediato, así que no se añaden días.
      daysToAdd = 0;
      break;
    case 'condition_0002': // 1 semana
      daysToAdd = 7;
      break;
    case 'condition_0003': // 15 días
      daysToAdd = 15;
      break;
    case 'condition_0004': // 30 días
      daysToAdd = 30;
      break;
    case 'condition_0005': // Otros, necesitarías definir una lógica específica para 'Otros'
      // Por ahora, no añadimos días. Podrías modificar esto según sea necesario.
      daysToAdd = 0;
      break;
    default:
      break;
  }

  const paymentDate = DateTime.fromMillis(createdAt).plus({ days: daysToAdd });
  return paymentDate.toMillis();
};
export const calculateTotalNewStockFromReplenishments = (replenishments) => {
  let totalNewStock = 0;
  if (replenishments && Array.isArray(replenishments)) {
    replenishments.forEach(item => {
      if (item.newStock && typeof item.newStock === 'number') {
        totalNewStock += item.newStock;
      }
    });
  }

  return totalNewStock;
};

export const PendingOrdersTable = () => {

  const user = useSelector(selectUser);
  const { pendingOrders } = fbGetPendingOrders(user);

  const data = pendingOrders.map(({ data }) => {
    const paymentDate = calculatePaymentDate(data?.dates?.createdAt, data?.condition);
    return {
      number: data?.numberId,
      state: data?.state,
      provider: data?.provider?.name,
      condition: data?.condition,
      note: data?.note,
      createdAt: data?.dates?.createdAt,
      paymentDate,
      items: calculateTotalNewStockFromReplenishments(data?.replenishments),
      deliveryDate: data?.dates?.deliveryDate,
      total: data?.total,
      action: data
    }
  })

  return (
    <AdvancedTable
      tableName={'Lista de Pedidos Pendientes'}
      columns={columns}
      data={data}
      filterUI
      filterConfig={filterConfig}
    />
  )
}