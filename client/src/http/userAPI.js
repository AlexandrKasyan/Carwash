//Api для обрашения к серверу
import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const { data } = await $host.post('api/user/registration', { email, password, roleId: 2, carWashId: 1 })
    localStorage.setItem('token', data.token)//сохранение токена в локальное хранилище браузера
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    console.log(jwt_decode(data.token))
    return jwt_decode(data.token)
}

export const check = async () => { // проверка авторизации
    try {
        const { data } = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
    }
    catch(e){
        localStorage.removeItem('token')
    }
}

export const getUsers = async (limit, page) => {
    const { data } = await $host.get('api/user/', {
        params: {
            limit: limit,
            page: page
        }
    })

    return data
}

export const getMyAccount = async () => {
    const data =  await $authHost.get('api/user/myaccount')
    return data.data
}


export const remove = async (id) => {
    await $authHost.post('api/client/removeFromUser', { id })
    await $authHost.post('api/user/remove', { id })
}

export const create = async (email, password, roleId, carWashId) => {
    carWashId = carWashId || 1;
    await $authHost.post('api/user/create', { email, password, roleId, carWashId })
}

export const edit = async (id, email, password, roleId, carWashId) => {
    carWashId = carWashId || 1;
    await $authHost.post('api/user/edit', { id, email, password, roleId, carWashId })
}

export const editByUserEmail = async (id, email) => {
    await $authHost.post('api/user/editByUserEmail', { id, email})
}

export const editByUserCarWash = async (id, carWashId) => {
    await $authHost.post('api/user/editByUserCarWash', { id, carWashId})
}

export const editByUserPassword = async (id, newPassword, lastPassword) => {
    await $authHost.post('api/user/editPassword', { id, newPassword, lastPassword})
}