import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Spinner } from 'react-bootstrap'
import { Context } from '../../../..'
import MyModal from '../../../../components/MyModal/MyModal'
import { getCarsByListId } from '../../../../http/carAPI'
import { getClientCars } from '../../../../http/clientCarAPI'
import { changeClientOrderStatus, getClientOrders } from '../../../../http/orderAPI'
import { getOrderServicesId } from '../../../../http/orderServiceRelationAPI'
import { getStatuses } from '../../../../http/statusAPI'
import { getWashService } from '../../../../http/washServiceAPI'
import { fetchClientData } from '../../../../utils/account'
import ClientForm from '../ClientForm'
import ClientInfo from '../ClientInfo'
import NavBarAccount from '../NavBarAccount'

const ClientOrder = observer(() => {
  const { order } = useContext(Context)
  const { client } = useContext(Context)
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!client.client.name) {
        const clientData = await fetchClientData(user.user.id)
        if (!clientData) {
          return (<ClientForm />)
        }
        else {
          const clientCars = await getClientCars(clientData.id)
          let carsId = []
          clientCars.forEach(e => {
            carsId.push(e.carId)
          })
          const carsList = await getCarsByListId(carsId)
          client.setClientCars(carsList)
          client.setClient(clientData)
        }
      }
      if (order.orders) {
        await clientOrders()
        await getOrderStatuses()
      }
    }
    fetchData()
    setLoading(false)

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


  const getOrderServices = async (orderId) => {
    setModal(true)
    order.setServices([])
    const orderIdAndServiceId = await getOrderServicesId(orderId)
    for (let index = 0; index < orderIdAndServiceId.length; index++) {
      const element = orderIdAndServiceId[index];
      console.log(element)
      let tmp = await getWashService(element.washServiceId)
      order.setServices([...order.services, tmp])
    }
  }

  const cancelOrder = async (orderid) => {
    const orderEdit = await changeClientOrderStatus(orderid, 'Отменён')

    const newList = order.orders.map(o => {
      if (o.id === orderEdit.id) {
        return orderEdit;
      }
      return o;
    });
    order.setOrders(newList)
    console.log(newList)
  }


  return (

    <Container className='mt-5'>
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
                  {
                    order.orders.length ?
                      <div className='client-order-box'>
                        <h4
                          style={{
                            textAlign: "center",
                            marginBottom: '1rem'
                          }}
                        >Заказы</h4>
                        {order.orders.map((element) =>
                          <div
                            key={element.id}
                            className='client-order-row'>
                            <div
                              className='client-order-row-info'
                              onClick={async () => await getOrderServices(element.id)}
                            >
                              <div>
                                {
                                  client.clientCars.map((car) =>
                                    car.id === element.carId ?
                                      car.number
                                      :
                                      ''
                                  )
                                }
                              </div>

                              <div>{
                                element.dateTime ?
                                  `${element.dateTime.split("T")[0]} ${element.dateTime.split("T")[1].slice(0, 5)} ` :
                                  ''
                              }
                              </div>

                              <div>{element.generalPrice}р.</div>

                              <div>
                                {
                                  order.statuses.map(status =>
                                    element.statusId === status.id ?
                                      status.name : ''
                                  )
                                }
                              </div>
                            </div>
                            {
                              order.statuses.map(status =>
                                element.statusId === status.id ?
                                  <Button
                                    key={status.id}
                                    onClick={() => cancelOrder(element.id)}
                                    disabled={
                                      status.name === 'Ожидание' ?
                                        false :
                                        true
                                    }>
                                    Отмена
                                  </Button>
                                  :
                                  ''
                              )}
                          </div>
                        )}
                      </div> :
                      <div className='client-order-box'>
                        У вас нет ещё ни одного заказа :(
                      </div>
                  }
                </div>
                <MyModal
                  visible={modal}
                  setVisible={setModal}
                >
                  {console.log(order.services)}
                  {
                    !order.services.length ?
                      <Spinner />
                      :
                      <div>
                        {

                          order.services.map((service) =>
                            <div key={service.id + 1}>
                              <div>{service.name}</div>
                              <div>{service.cost}</div>
                            </div>
                          )
                        }

                      </div>
                  }

                </MyModal>
              </div>
              :
              <ClientForm />
          }
        </div>}
    </Container >

  )
})

export default ClientOrder