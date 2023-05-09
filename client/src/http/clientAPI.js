import { $authHost, $host } from ".";


export const getClients = async (limit, page) => {
    const { data } = await $authHost.get('api/client/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getClientInfoByUserId = async (id) => {
    const { data } = await $host.get('api/client/getclientbyuserid', {
        params: {
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/client/remove', { id })
}

export const create = async (name, phoneNumber, userId, discountId) => {
    await $authHost.post('api/client/create', { name, phoneNumber, userId, discountId })
}

export const edit = async (id, name, phoneNumber, userId, discountId) => {
    await $authHost.post('api/client/edit', { id, name, phoneNumber, userId, discountId })
}

export const changeNameByUser = async (id, name) => {
    await $authHost.post('api/client/changeName', { id, name })
}

export const changePhoneByUser = async (id, phoneNumber) => {
    await $authHost.post('api/client/changePhone', { id, phoneNumber })
}

