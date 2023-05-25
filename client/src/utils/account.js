import { getCarWash } from "../http/carWashAPI"
import { getClientInfoByUserId } from "../http/clientAPI"
import { getClientDiscount } from "../http/discountAPI"

export const fetchClientData = async (id) => {
    const clientData = await getClientInfoByUserId(id)
    if (!clientData) return
    return clientData
}

export const fetchCarWashData = async (id) => {
    const carWashData = await getCarWash(id)
    if (!carWashData) return
    return carWashData 
}

export const fetchDiscountData = async (id) => {
    const discountData = await getClientDiscount(id)
    if (!discountData) return
    return discountData 
}
