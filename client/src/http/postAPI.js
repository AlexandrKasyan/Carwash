import { $authHost} from ".";


export const getPosts = async (limit, page) => {
    const {data} = await  $authHost.get('api/post/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/post/remove', {id})
}

export const create = async (name, duties) => {
    await  $authHost.post('api/post/create', {name, duties})
}

export const edit = async (id, name, duties) => {
    await  $authHost.post('api/post/edit', {id, name, duties})
}