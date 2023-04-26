import { $authHost } from ".";


export const getClientsCars = async (limit, page) => {
    const { data } = await $authHost.get('api/clientCar/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getClientCars = async (clientId) => {
    const { data } = await $authHost.get('api/clientCar/getClientCars', {
        params: {
            clientId: clientId
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/clientCar/remove', { id })
}

export const removeByCarId = async (id) => {
    await $authHost.post('api/clientCar/removeByCarId', { id })
}

export const create = async (clientId, carId) => {
    await $authHost.post('api/clientCar/create', { clientId, carId })
}

export const edit = async (id, clientId, carId) => {
    await $authHost.post('api/clientCar/edit', { id, clientId, carId })
}