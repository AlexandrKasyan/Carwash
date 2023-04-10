import { $authHost} from ".";


export const getOrders = async (limit, page) => {
    const {data} = await  $authHost.get('api/order/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/order/remove', {id})
}

export const create = async (dateTime, generalPrice, statusId, clientId) => {
    await  $authHost.post('api/order/create', {dateTime, generalPrice, statusId, clientId})
}

export const edit = async (id, dateTime, generalPrice, statusId, clientId) => {
    await  $authHost.post('api/order/edit', {id, dateTime, generalPrice, statusId, clientId})
}