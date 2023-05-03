import { $authHost} from ".";


export const getOrderServiceRelations = async (limit, page) => {
    const {data} = await  $authHost.get('api/orderServiceRelations/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const getOrderServicesId = async (orderId) => {
    const {data} = await  $authHost.get('api/orderServiceRelations/orderServicesId', {
        params:{
            orderId: orderId
        }
    })
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/orderServiceRelations/remove', {id})
}

export const create = async (washServiceId, orderId) => {
    await  $authHost.post('api/orderServiceRelations/create', {washServiceId, orderId})
}

export const edit = async (id, washServiceId, orderId) => {
    await  $authHost.post('api/orderServiceRelations/edit', {id, washServiceId, orderId})
}