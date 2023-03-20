import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await  $host.post('api/user/registration', {email, password, roleId: 2})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await  $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await  $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getUsers = async (limit, page) => {
    const {data} = await  $authHost.get('api/user/', {
        params:{
            limit: limit,
            page: page
        }
    })
    console.log(data)
    return data
}

export const remove = async (id) => {
    await  $authHost.post('api/client/removeFromUser', {id})
    await  $authHost.post('api/user/remove', {id})
}

export const create = async (email, password, roleId) => {
    await  $authHost.post('api/user/create', {email, password, roleId})
}

export const edit = async (id, email, password, roleId) => {
    await  $authHost.post('api/user/edit', {id, email, password, roleId})
}