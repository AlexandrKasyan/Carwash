import { $authHost } from ".";


export const getDiscounts = async (limit, page) => {
    const { data } = await $authHost.get('api/discount/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getClientDiscount = async (id) => {
    const { data } = await $authHost.get('api/discount/getDiscount', {
        params: {
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/discount/remove', { id })
}

export const create = async (name, discountPercentage, numberVisits) => {
    const discount = await $authHost.post('api/discount/create', { name, discountPercentage, numberVisits })
    return discount.data
}

export const edit = async (id, name, discountPercentage, numberVisits) => {
    const data = await $authHost.post('api/discount/edit', { id, name, discountPercentage, numberVisits })
    return data

}