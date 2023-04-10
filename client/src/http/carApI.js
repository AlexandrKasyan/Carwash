import { $authHost} from ".";


export const getCars = async (limit, page) => {
    const {data} = await  $authHost.get('api/car/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/car/remove', {id})
}

export const create = async (number, yearRelease, bodyId, carBrandId) => {
    await  $authHost.post('api/car/create', {number, yearRelease, bodyId, carBrandId})
}

export const edit = async (id, number, yearRelease, bodyId, carBrandId) => {
    await  $authHost.post('api/car/edit', {id, number, yearRelease, bodyId, carBrandId})
}