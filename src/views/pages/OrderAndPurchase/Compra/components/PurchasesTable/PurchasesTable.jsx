import { useState } from 'react'
import { AdvancedTable } from '../../../../../templates/system/AdvancedTable/AdvancedTable'
import { calculateTotalNewStockFromReplenishments } from '../../../Order/components/OrderListTable/OrdersTable'
import { CancelModal } from '../CancelModal/CancelModal'
import { columns } from './tableConfig'
import { fbCancelPurchase } from '../../../../../../firebase/purchase/fbCancelPurchase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../../features/auth/userSlice'
import { DateTime } from 'luxon'

export function PurchaseTable({ purchases, loadingPurchases }) {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState(null)
  const user = useSelector(selectUser)

  const handleOpenCancelModal = (purchase) => {
    setSelectedPurchase(purchase)
    setIsCancelModalOpen(true)
  }

  const handleCloseCancelModal = () => {
    setIsCancelModalOpen(false)
    setSelectedPurchase(null)
  }

  const handleConfirmCancel = async (reason) => {
    await fbCancelPurchase(user, selectedPurchase?.id, reason);
    handleCloseCancelModal()
  }

  const modalConfig = {
    title: "¿Está seguro de cancelar la compra?",
    confirmButtonText: "Cancelar Compra",
    cancelButtonText: "Cerrar",
    requireConfirmationCode: true,
    showTextArea: true,
    alertMessage: "Una vez cancelada la compra, esta acción no se podrá deshacer",
    alertType: "error"
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
        onCancel: () => handleOpenCancelModal(data)
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
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseCancelModal}
        onConfirm={handleConfirmCancel}
        config={modalConfig}
      />
    </>
  )
}


