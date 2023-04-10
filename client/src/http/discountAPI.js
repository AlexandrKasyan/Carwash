import { $authHost} from ".";


export const getDiscounts = async (limit, page) => {
    const {data} = await  $authHost.get('api/discount/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/discount/remove', {id})
}

export const create = async (name, discountPercentage, numberVisits) => {
    await  $authHost.post('api/discount/create', {name, discountPercentage, numberVisits})
}

export const edit = async (id, name, discountPercentage, numberVisits) => {
    await  $authHost.post('api/discount/edit', {id, name, discountPercentage, numberVisits})
}