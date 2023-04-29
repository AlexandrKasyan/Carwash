import { getCarWash } from "../http/carWashAPI"
import { getClientInfoByUserId } from "../http/clientAPI"
import { getDiscount } from "../http/discountAPI"
import { getMyAccount } from "../http/userAPI"


export const fetchClientData = async () => {
    const userData = await getMyAccount()
    if (!userData) return

    const carWashData = await getCarWash(userData.carWashId)
    if (!carWashData) return

    const clientData = await getClientInfoByUserId(userData.id)
    if (!clientData) return

    const discountData = await getDiscount(clientData.discountId)
    if (!discountData) return

    return { userData, carWashData, clientData, discountData }
}