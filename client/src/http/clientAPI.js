import { $authHost, $host } from ".";


export const getClients = async (limit, page) => {
    const { data } = await $authHost.get('api/client/', {
        params: {
            limit: limit,
            page: page
        }
    })
    return data
}

export const getClientInfoByUserId = async (id) => {
    const { data } = await $host.get('api/client/getclientbyuserid', {
        params: {
            id: id
        }
    })
    return data
}

export const remove = async (id) => {
    await $authHost.post('api/client/remove', { id })
}

export const create = async (name, phoneNumber, userId, discountId) => {
    await $authHost.post('api/client/create', { name, phoneNumber, userId, discountId })
}

export const edit = async (id, name, phoneNumber, userId, discountId) => {
    await $authHost.post('api/client/edit', { id, name, phoneNumber, userId, discountId })
}

export const changeNameByUser = async (id, name) => {
    await $authHost.post('api/client/changeName', { id, name })
}

export const changePhoneByUser = async (id, phoneNumber) => {
    await $authHost.post('api/client/changePhone', { id, phoneNumber })
}

export const createReport = async (clientData) => {
    const { data } = await $authHost.post('api/client/createReport', { clientData })
    return data
}

export async function downloadReport(fileName) {
    const response = await fetch(`http://localhost:5000/api/client/downloadReport?fileName=${fileName}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}