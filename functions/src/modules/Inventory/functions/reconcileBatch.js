import { onDocumentWritten } from 'firebase-functions/v2/firestore'
import { updateBatchStatusForProductStock } from '../services/batch.service.js'

export const reconcileBatch = onDocumentWritten(
  'businesses/{businessID}/productsStock/{stockId}',
  async (event) => {
    const after = event.data?.after?.data
    if (!after || !after.batchId || !after.productId) return

    try {
      await updateBatchStatusForProductStock(
        event.context.params.businessID,
        after.batchId,
        after.productId
      )
    } catch (err) {
      console.error('reconcileBatch error:', err)
    }
  }
)
