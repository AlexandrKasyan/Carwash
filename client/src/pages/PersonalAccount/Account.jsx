import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './components/account.css'
import ClientInfo from './components/ClientInfo'
import { observer } from 'mobx-react-lite'
import NavBarAccount from './components/NavBarAccount'
import { Context } from '../..'
import { fetchClientData } from '../../utils/account'
import ClientForm from './components/ClientForm'
import { getCarsByListId } from '../../http/carAPI'
import { getClientCars } from '../../http/clientCarAPI'

const Account = observer(() => {
    const { client } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            if (!client.client.name) {
                const clientData = await fetchClientData(user.user.id)
                client.setClient(clientData)
                getListClientCar()
            }
        }

        const getListClientCar = async () => {
            const clientCars = await getClientCars(client.client.id)
            let carsId = []
            clientCars.forEach(e => {
                carsId.push(e.carId)
            })
            const carsList = await getCarsByListId(carsId)
            client.setClientCars(carsList)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [])



    if (!client.client)
        return (<ClientForm />)

    return (
        <Container className='mt-5'>
            <div className='account animation-left' >
                <ClientInfo />
                <NavBarAccount />
            </div>
        </Container >
    )
})

export default Account