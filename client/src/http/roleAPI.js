import { $authHost} from ".";


export const getRoles = async (limit, page) => {
    const {data} = await  $authHost.get('api/role/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/role/remove', {id})
}

export const create = async (role) => {
    await  $authHost.post('api/role/create', {role})
}

export const edit = async (id, role) => {
    await  $authHost.post('api/role/edit', {id, role})
}