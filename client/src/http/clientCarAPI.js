import { $authHost} from ".";


export const getClientCars = async (limit, page) => {
    const {data} = await  $authHost.get('api/clientCar/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/clientCar/remove', {id})
}

export const create = async (clientId, carId) => {
    await  $authHost.post('api/clientCar/create', {clientId, carId})
}

export const edit = async (id, clientId, carId) => {
    await  $authHost.post('api/clientCar/edit', {id, clientId, carId})
}