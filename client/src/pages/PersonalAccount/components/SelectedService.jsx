import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Dropdown, Form, Spinner } from 'react-bootstrap'
import { AiOutlineCar, AiOutlineDelete } from 'react-icons/ai'
import { Context } from '../../..'
import { edit } from '../../../http/discountAPI'
import { create as createOrder } from '../../../http/orderAPI'
import { create as createOrderServiceRelation } from '../../../http/orderServiceRelationAPI'
import ClientDiscount from './ClientDiscount'
import ClientForm from './ClientForm'
import ClientInfo from './ClientInfo'
import NavBarAccount from './NavBarAccount'

const SelectedService = observer(() => {
  const { selectedServices } = useContext(Context)
  const [loading, setLoading] = useState(true);

  const { client } = useContext(Context)
  const { discount } = useContext(Context)
  const { order } = useContext(Context)

  useEffect(() => {
    generalPrice()
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const createClientOrder = async () => {
    if (client.selectedCar.id) {
      if (selectedServices.selectedServices.length) {
        const clientOrder = await createOrder(order.newOrder.dateTime + ':00.000Z', selectedServices.generalPrice, 2, client.client.id, client.selectedCar.id)
        console.log(order.newOrder.dateTime)
        await selectedServices.selectedServices.forEach(async (service) => {
          await createOrderServiceRelation(service.id, clientOrder.id)
        })
        selectedServices.setSelectedServices([])
        order.setOrders([...order.orders, clientOrder])
        selectedServices.setGeneralPrice(0)
        addDiscountPercentage()
      }
      else {
        alert('Ваша корзина пуста')
      }
    }
    else {
      alert('Выберите автомобиль')
    }
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

  const addDiscountPercentage = async () => {
    let discountPercentage = discount.discount.discountPercentage
    let discountName = "Отсутствует"

    if (discountPercentage < 10)
      discountName = 'Обычная'
    if (discountPercentage >= 10 && discountPercentage >= 30)
      discountName = 'Повышеная'
    if (discountPercentage >= 31 && discountPercentage >= 50)
      discountName = 'Высокая'
    if (discountPercentage >= 51 && discountPercentage >= 90)
      discountName = 'Супер'
    if (discountPercentage >= 91 && discountPercentage >= 100)
      discountName = 'Супер пупер'

    const editDiscount = await edit(discount.discount.id, discountName, discountPercentage + 1, discount.discount.numberVisits + 1)
    discount.setDiscount(editDiscount)
  }

  const removeService = (id) => {
    selectedServices.setSelectedServices(selectedServices.selectedServices.filter(n => n.id !== id))
    generalPrice();
  }

  return (
    <Container className='mt-5'>
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

                  <ClientDiscount />
                  {client.clientCars.length ?
                    <div className='selected-services'>
                      <h4
                        style={{
                          textAlign: "center",
                          marginBottom: '1rem'
                        }}
                      >Ваш заказ</h4>
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
                          Подтвердить
                        </Button>
                      </div>
                    </div> :
                    <div className='selected-services'>
                      <h3>У вас не добавлено ни одного авто</h3>
                      <div>Добавте автомобиль и возращайтесь</div>
                    </div>
                  }
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