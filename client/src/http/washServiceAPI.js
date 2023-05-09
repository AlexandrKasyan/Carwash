import { $authHost } from ".";


export const getWashServices = async (limit, page) => {
    const { data } = await $authHost.get('api/washService/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getWashService = async (id) => {
    const { data } = await $authHost.get('api/washService/getOne', {
        params: {
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/washService/remove', { id })
}

export const create = async (services) => {
    let config = {
        header: { 'content-type': 'multypart/form-data' }
    }
    await $authHost.post('api/washService/create', services, config)
}

export const edit = async (services) => {
    let config = {
        header: { 'content-type': 'multypart/form-data' }
    }
    console.log(services)
    await $authHost.post('api/washService/edit', services, config)
}