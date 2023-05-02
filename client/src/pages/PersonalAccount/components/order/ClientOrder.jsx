import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import { Context } from '../../../..'
import { getClientOrders } from '../../../../http/orderAPI'
import { getStatuses } from '../../../../http/statusAPI'
import ClientForm from '../ClientForm'
import ClientInfo from '../ClientInfo'
import NavBarAccount from '../NavBarAccount'

const ClientOrder = observer(() => {
  const { order } = useContext(Context)
  const { client } = useContext(Context)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientOrders()
    getOrderStatuses()
    setLoading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const clientOrders = async () => {
    const clientId = client.client.id
    const data = await getClientOrders(clientId)
    order.setOrders(data)
  }

  const getOrderStatuses = async () => {
    const statuses = await getStatuses()
    order.setStatuses(statuses.rows)
  }

  return (

    <Container>
      {loading ? <Spinner animation="border" className='user-info-spiner'>
        <span className="visually-hidden">Loading...</span>
      </Spinner> :
        <div>
          {
            client.client.name ?
              <div className='account'>
                <ClientInfo />
                <div>
                  <NavBarAccount />
                  <div className='client-order-box'>
                    {order.orders.map((element) =>
                      <div key={element.id}>
                        <div>{element.generalPrice}</div>

                        {client.clientCars.map((car) =>
                          <div key={car.id + 1}>{
                            car.id === element.carId ?
                              car.number
                              :
                              ''}
                          </div>
                        )}

                        <div>
                          {order.statuses.map(status =>
                            <div key={status.id + 1}>
                              {status.id === element.statusId ?
                                status.name
                                : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              :
              <ClientForm />
          }
        </div>}
    </Container >

  )
})

export default ClientOrder