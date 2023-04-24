import { $authHost} from ".";


export const getCarWashes = async (limit, page) => {
    const {data} = await  $authHost.get('api/carwash/', {
        params:{
            limit: limit,
            page: page
        }
    })
    return data
}

export const getCarWash = async (id) => {
    const {data} = await  $authHost.get('api/carwash/getOne', {
        params:{
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/carwash/remove', {id})
}

export const create = async (name, number, address) => {
    await  $authHost.post('api/carwash/create', {name, number, address})
}

export const edit = async (id, name, number, address) => {
    await  $authHost.post('api/carwash/edit', {id, name, number, address})
}