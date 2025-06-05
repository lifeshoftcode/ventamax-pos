import { useDispatch } from "react-redux"
import { useMemo } from "react"
import { getPendingPurchaseFromDB } from "../../../../../features/purchase/addPurchaseSlice"

export const SetPendingPurchaseInState = (purchase) => {
    const dispatch = useDispatch()
    useMemo(() => {
        if (purchase.length > 0) dispatch(getPendingPurchaseFromDB({ optionsID: 'Pedidos', datas: purchase, propertyName: 'data'}))
    }, [purchase])
}