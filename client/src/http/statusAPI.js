import { $authHost} from ".";


export const getStatuses = async (limit, page) => {
    const {data} = await  $authHost.get('api/status/', {
        params:{
            limit: limit,
            page: page
        }
    })
    return data
}

export const getStatus = async (id) => {
    const {data} = await  $authHost.get('api/status/getone', {
        params:{
            id:id
        }
    })
    return data
}
export const remove = async (id) => {
    await  $authHost.post('api/status/remove', {id})
}

export const create = async (name) => {
    await  $authHost.post('api/status/create', {name})
}

export const edit = async (id, name) => {
    await  $authHost.post('api/status/edit', {id, name})
}