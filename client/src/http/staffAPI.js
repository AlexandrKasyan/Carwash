import { $authHost} from ".";


export const getStaff = async (limit, page) => {
    const {data} = await  $authHost.get('api/staff/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const getEmployee = async (id) => {
    const {data} = await  $authHost.get('api/staff/employeeByUserId', {
        params:{
            id:id
        }
    })
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/staff/remove', {id})
}

export const create = async (name, phoneNumber, position, userId, postId) => {
    await  $authHost.post('api/staff/create', {name, phoneNumber, position, userId, postId})
}

export const edit = async (id, name, phoneNumber, position, userId, postId) => {
    await  $authHost.post('api/staff/edit', {id, name, phoneNumber, position, userId, postId})
}