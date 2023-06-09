import { $authHost } from ".";


export const getOrders = async (limit, page) => {
    const { data } = await $authHost.get('api/order/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getClientOrders = async (id) => {
    const { data } = await $authHost.get('api/order/clientOrders', {
        params: {
            id: id
        }
    })
    return data
}

export const getClientsOrdersByDate = async (dateTime) => {
    const { data } = await $authHost.get('api/order/getbydate', {
        params: {
            dateTime: dateTime
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/order/remove', { id })
}

export const create = async (dateTime, generalPrice, statusId, clientId, carId) => {
    const { data } = await $authHost.post('api/order/create', { dateTime, generalPrice, statusId, clientId, carId })
    return data
}

export const edit = async (id, dateTime, generalPrice, statusId, clientId, carId) => {
    await $authHost.post('api/order/edit', { id, dateTime, generalPrice, statusId, clientId, carId })
}

export const changeClientOrderStatus = async (id, statusName) => {
    const { data } = await $authHost.post('api/order/changeStatus', { id, statusName })
    return data
}
