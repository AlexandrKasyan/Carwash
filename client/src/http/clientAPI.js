import { $authHost} from ".";


export const getClients = async (limit, page) => {
    const {data} = await  $authHost.get('api/client/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/client/remove', {id})
}

export const create = async (name, phoneNumber, userId, discountId) => {
    await  $authHost.post('api/client/create', {name, phoneNumber, userId, discountId})
}

export const edit = async (id, name, phoneNumber, userId, discountId) => {
    await  $authHost.post('api/client/edit', {id, name, phoneNumber, userId, discountId})
}