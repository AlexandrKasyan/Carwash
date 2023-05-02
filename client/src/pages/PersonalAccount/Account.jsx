import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import './components/account.css'
import ClientInfo from './components/ClientInfo'
import { observer } from 'mobx-react-lite'
import NavBarAccount from './components/NavBarAccount'
import { Context } from '../..'
import { fetchClientData } from '../../utils/account'
import ClientForm from './components/ClientForm'

const Account = observer(() => {
    const { client } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        const fetchData = async () => {
            if (!client.client.name) {
                const clientData = await fetchClientData(user.user.id)
                if (!clientData) {
                    return (<ClientForm />)
                }
                else {
                    client.setClient(clientData)
                }
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps       
    }, [])


    return (
        <Container>
            <div className='account' >
                <ClientInfo />
                <NavBarAccount />
            </div>
        </Container >
    )
})

export default Account