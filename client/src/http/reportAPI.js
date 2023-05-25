import { $authHost } from ".";


export const createReport = async (arrayPosts, columns, nameReport, user) => {
    const { data } = await $authHost.post('api/report/createReport', { arrayPosts, columns, nameReport, user })
    return data
}

export async function downloadReport(fileName) {
    const response = await fetch(`http://localhost:5000/api/report/downloadReport?fileName=${fileName}`, {
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