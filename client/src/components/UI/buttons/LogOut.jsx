import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../../../index'

const LogOut = () => {
    const { user } = useContext(Context)
    const { order } = useContext(Context)
    const { client } = useContext(Context)
    const { employee } = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        employee.setEmployee({})
        client.setClient({})
        client.setClientCars([])
        client.setSelectedCar({})
        order.setOrders([])
        order.setStatuses([])
        localStorage.removeItem('token')
    }
    return (
        <Button
            onClick={() => logOut()}
            variant='outline-danger'
        >
            Выход
        </Button>
    )
}

export default LogOut