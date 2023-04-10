import { $authHost} from ".";


export const getBrands = async (limit, page) => {
    const {data} = await  $authHost.get('api/carBrand/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/carBrand/remove', {id})
}

export const create = async (name) => {
    await  $authHost.post('api/carBrand/create', {name})
}

export const edit = async (id, name) => {
    await  $authHost.post('api/carBrand/edit', {id, name})
}