import React, { useEffect, useState, useContext } from 'react'
import { Context } from '../index'
import { Button, Container } from 'react-bootstrap'
import { getCarWash } from '../http/carWashAPI'
import { getMyAccount } from '../http/userAPI'

const Account = () => {
    const { user } = useContext(Context)
    const [userInfo, setUserInfo] = useState({})
    const [carWash, setCarWash] = useState({})

    useEffect(() => {
        async function fetchData() {
            const userData = await getMyAccount()
            if (!userData)
                return
            console.log(userData)
            setUserInfo(userData)
            const carWashData = await getCarWash(userData.carWashId)
            if (!carWashData)
                return
            setCarWash(carWashData)
            console.log(carWashData)
        }
        fetchData()
    }, [])

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <Container>
            <h3>Ваш личный кабинет</h3>
            <div className='user-info'>
                <li>Выбранная автомойка: {carWash.name}</li>
                <li>Номер автомоки: {carWash.number}</li>
                <li>Email: {userInfo.email}</li>
                <li>Дата регистрации: {userInfo.createdAt}</li>
            </div>

            <Button onClick={() => logOut()}>Выход</Button>

        </Container>
    )
}

export default Account