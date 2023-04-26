import { $authHost } from ".";


export const getBodies = async (limit, page) => {
    const { data } = await $authHost.get('api/carBody/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getBody = async (id) => {
    const { data } = await $authHost.get('api/carBody/getBody', {
        params: {
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/carBody/remove', { id })
}

export const create = async (name) => {
    await $authHost.post('api/carBody/create', { name })
}

export const edit = async (id, name) => {
    await $authHost.post('api/carBody/edit', { id, name })
}

