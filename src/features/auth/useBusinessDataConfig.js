import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "./userSlice"
import { useEffect } from "react"
import { subscribeToBusinessInfo } from "../../firebase/businessInfo/fbGetBusinessInfo"
import { setBusiness } from "./businessSlice"

export const useBusinessDataConfig = () => {
    const dispatch = useDispatch();
    const businessID = useSelector(selectUser)?.businessID;

    useEffect(() => {
        if (!businessID) {
            dispatch(setBusiness(null))
            return
        }

        const unsubscribe = subscribeToBusinessInfo(
            businessID,
            (business) => {
                dispatch(setBusiness(business));
            },
            (error) => {
                console.error("Error al obtener la información del negocio:", error);
                dispatch(setBusiness(null));
            }
        );

        return unsubscribe;

    }, [businessID, dispatch])

}
