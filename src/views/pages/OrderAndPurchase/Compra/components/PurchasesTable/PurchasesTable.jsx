import { useState } from 'react'
import { AdvancedTable } from '../../../../../templates/system/AdvancedTable/AdvancedTable'
import { calculateTotalNewStockFromReplenishments } from '../../../Order/components/OrderListTable/OrdersTable'
import { CancelModal } from '../CancelModal/CancelModal'
import { columns } from './tableConfig'
import { fbCancelPurchase } from '../../../../../../firebase/purchase/fbCancelPurchase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/auth/userSlice'
import { DateTime } from 'luxon'
import { useDialog } from '../../../../../../Context/Dialog/DialogContext'  // Nuevo import
import { message } from 'antd' // Nuevo import

export function PurchaseTable({ purchases, loadingPurchases }) {
  const { setDialogConfirm } = useDialog(); // Nuevo hook
  const user = useSelector(selectUser)

  const handleCancelPurchase = (purchase) => {
    setDialogConfirm({
      title: 'Cancelar compra',
      isOpen: true,
      type: 'error',
      message: '¿Está seguro que desea cancelar esta compra?',
      onConfirm: async () => {
        await fbCancelPurchase(user, purchase.id)
      },
      successMessage: 'Compra cancelada exitosamente'
    });
  }

  const data = purchases || []; // Asegura que data es un array aunque purchases sea undefined

  const mappedData = data
    .map((data) => ({
      state: data?.state,
      condition: data?.condition,
      number: data?.numberId,
      provider: data?.provider?.name,
      note: data?.note,
      deliveryAt: data?.deliveryAt,
      status: data?.status,
      fileList: data?.attachmentUrls || [],
      items: calculateTotalNewStockFromReplenishments(data?.replenishments),
      paymentAt: data?.paymentAt,
      total: (data?.replenishments || []).reduce((acc, { subtotal }) => acc + subtotal, 0),
      action: {
        ...data,
        onCancel: () => handleCancelPurchase(data)
      },
      dateGroup: DateTime.fromMillis(data?.createdAt).toLocaleString(DateTime.DATE_FULL)
    }))

  return (
    <>
      <AdvancedTable
        tableName={'Lista de Compras'}
        columns={columns}
        data={mappedData}
        loading={loadingPurchases}
        groupBy={'dateGroup'}
      />
    </>
  )
}


