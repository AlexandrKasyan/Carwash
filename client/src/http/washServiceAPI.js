import { $authHost} from ".";


export const getWashServices = async (limit, page) => {
    const {data} = await  $authHost.get('api/washService/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/washService/remove', {id})
}

export const create = async (name, description, cost) => {
    await  $authHost.post('api/washService/create', {name, description, cost})
}

export const edit = async (id, name, description, cost) => {
    await  $authHost.post('api/washService/edit', {id, name, description, cost})
}