import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Context } from '../../../index'

const LogOut = () => {
    const { user } = useContext(Context)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
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