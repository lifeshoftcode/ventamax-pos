import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebaseconfig"
import { setBusiness } from "../../features/auth/businessSlice"

export const fbGetBusinessInfo = (user, dispatch) => {
    if (!user || !user.businessID) { return }
    console.log("Getting business info")
    console.log(user.businessID)
    const businessInfoRef = doc(db, "businesses", user.businessID)
    const unsubscribe = onSnapshot(businessInfoRef, (doc) => {
        if (doc.exists) {
            console.log("Business info exists ---------------------------------")
            const { business } = doc.data()
            console.log('Doc:', doc.data())
            console.log('El negocio es:', business.name)
            console.log('Datos del negocio:', business)
            dispatch(setBusiness(business))
        }else {
            console.log("No such business ---------------------------------")
        }
    })
    return unsubscribe
}
