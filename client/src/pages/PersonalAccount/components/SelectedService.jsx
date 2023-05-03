import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Form, Spinner } from 'react-bootstrap'
import { AiOutlineCar, AiOutlineDelete } from 'react-icons/ai'
import { Context } from '../../..'
import { create as createOrder } from '../../../http/orderAPI'
import { create as createOrderServiceRelation } from '../../../http/orderServiceRelationAPI'
import ClientForm from './ClientForm'
import ClientInfo from './ClientInfo'
import NavBarAccount from './NavBarAccount'

const SelectedService = observer(() => {
  const { selectedServices } = useContext(Context)
  const [loading, setLoading] = useState(true);

  const { client } = useContext(Context)
  const { order } = useContext(Context)

  useEffect(() => {
    generalPrice()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const createClientOrder = async () => {
    const clientOrder = await createOrder(order.newOrder.dateTime, selectedServices.generalPrice, 2, client.client.id, client.selectedCar.id)
    await selectedServices.selectedServices.forEach(async (service) => {
      await createOrderServiceRelation(service.id, clientOrder.id)
    })
    selectedServices.setSelectedServices([])
    order.setOrders([...order.orders, clientOrder])
    selectedServices.setGeneralPrice(0)
  }

  const generalPrice = () => {
    let price = 0
    let array = selectedServices.selectedServices

    array.forEach((services) => {
      price += services.cost;
      if (!services) {
        price = 0;
      }

    })
    selectedServices.setGeneralPrice(price)
  }

  const removeService = (id) => {
    selectedServices.setSelectedServices(selectedServices.selectedServices.filter(n => n.id !== id))
    generalPrice();
  }

  return (
    <Container>
      {loading ? <Spinner animation="border" className='user-info-spiner'>
        <span className="visually-hidden">Loading...</span>
      </Spinner> :
        <div>
          {
            client.client.name ?
              <div className='account' >
                <ClientInfo />
                <div>
                  <NavBarAccount />
                  <div className='selected-services'>
                    <h4>Ваш заказ</h4>
                    {selectedServices.selectedServices.map((services) =>
                      <div
                        className='service-row'
                        key={services.id + 1}
                      >
                        <div>{services.name} </div>
                        <div> {services.cost}р.</div>
                        <Button
                          className='remove-service'
                          variant='btn btn-danger'
                          onClick={() => removeService(services.id)}
                        ><AiOutlineDelete size={20} /></Button>
                      </div>
                    )}
                    <div className="order-controll">
                      <Dropdown className="select-car">
                        <Dropdown.Toggle>{client.selectedCar.number || "Aвто"}  <AiOutlineCar /></Dropdown.Toggle>
                        <Dropdown.Menu>
                          {client.clientCars.map(car =>
                            <Dropdown.Item
                              onClick={() => client.setSelectedCar(car)}
                              key={car.id}
                            >
                              {car.number}
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control
                        className='dateTime'
                        type="datetime-local"
                        onChange={(e) => { order.setNewOrder({ ...order.newOrder, dateTime: e.target.value }) }}
                      />
                      <div className="generalPrice">
                        Итого: {selectedServices.generalPrice}р.
                      </div>
                      <Button
                        className='confirm-order'
                        onClick={() => createClientOrder()}
                      >
                        Поддвердить
                      </Button>
                    </div>
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

export default SelectedService