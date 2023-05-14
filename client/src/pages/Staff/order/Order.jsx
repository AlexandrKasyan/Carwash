import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import { Context } from '../../..'
import { getClients } from '../../../http/clientAPI'
import { changeClientOrderStatus, getClientsOrdersByDate, getOrders } from '../../../http/orderAPI'
import { getStatus, getStatuses } from '../../../http/statusAPI'

const Order = observer(() => {
    const { order } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const queryParams = { limit: 100, page: 1 };

    useEffect(() => {
        if (!order.orders.length || !order.statuses.length) {
            getOrdersEffect()
            setLoading(false)
        }
        else
            setLoading(false)
// eslint-disable-next-line
    }, [order])
    const getOrdersEffect = async () => {
        const ordersFethData = await getOrders(queryParams.limit, queryParams.page)
        const clientData = await getClients(queryParams.limit, queryParams.page)
        const statusesFethData = await getStatuses(queryParams.limit, queryParams.page)
        const orderArray = ordersFethData.rows.map((element) => {
            clientData.forEach((client) => {
                if (element.clientId === client.id) {
                    element = {
                        ...element,
                        name: client.name,
                        phoneNumber: client.phoneNumber,
                        userId: client.userId,
                        createdAt: element.createdAt.slice(0, 10)
                    }
                }
            })
            return element
        })
        const orderArrayWithStatuses = orderArray.map((orderElement) => {
            statusesFethData.rows.forEach((status) => {
                if (orderElement.statusId === status.id)
                    orderElement = {
                        ...orderElement,
                        status: status.name
                    }
            })
            return orderElement
        })
        order.setOrders(orderArrayWithStatuses)
    }


    const changeOrderStatus = async (selectOrder, statusName) => {
        const orderData = await changeClientOrderStatus(selectOrder.id, statusName)
        const status = await getStatus(orderData.statusId)
        const ordersArray = order.orders.map(orderElement => {
            if (orderElement.id === orderData.id)
                return {
                    ...orderElement,
                    statusId: orderData.statusId,
                    status: status.name
                }
            else return orderElement
        })
        order.setOrders(ordersArray)
    }


    const sortPosts = (posts, sort) => {
        if (sort) {
            return [...posts].sort((b, a) => String(a[sort]).localeCompare(String(b[sort])))
        }
        return posts;
    }

    const sortBy = (sort) => {
        const sortedPosts = sortPosts(order.orders, sort)
        order.setOrders(sortedPosts)
    }

    const checkDateEntrance = async (date) => {
        if (date) {
            const dateNow = date.toJSON().split('T')[0];
            const orderRequest = await getClientsOrdersByDate(dateNow)
// eslint-disable-next-line
            const newOrderArray = order.orders.filter((orderElement) => {
                let tpm
                orderRequest.rows.forEach((orderReq) => {
                    if (orderElement.id === orderReq.id) tpm = true
                    else tpm = false
                })
                if (tpm) return orderElement
            })
            order.setOrders(newOrderArray)
        }
        else getOrdersEffect()
    }

    return (
        <div >
            {loading ? <Spinner /> :
                <div>
                    <Card className='order-box'>
                        <Row className='order-control-date'>
                            <Col md={2} onClick={() => checkDateEntrance()}>Все заказы</Col>
                            <Col md={3} onClick={() => checkDateEntrance(new Date())}>Заказы на сегодня</Col>
                            <Col md={3} onClick={() => checkDateEntrance(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))}>Заказы на завтра</Col>
                        </Row>
                        <Row className='order-control-sort'>
                            <Col md={2} onClick={() => sortBy('dateTime')}>Дата</Col>
                            <Col md={2} onClick={() => sortBy('name')}>Клиент</Col>
                            <Col md={2} onClick={() => sortBy('generalPrice')}>Сумма</Col>
                            <Col md={3} onClick={() => sortBy('statusId')}>Статус</Col>
                        </Row>
                        {order.orders.map((orderElement) =>
                            <Row className='order-row' key={orderElement.id + 1}>
                                <Col md={2}>
                                    {orderElement.dateTime ?
                                        `${orderElement.dateTime.split("T")[0]} ${orderElement.dateTime.split("T")[1].slice(0, 5)} ` :
                                        ''}
                                </Col>
                                <Col md={2}>
                                    {orderElement.name}
                                </Col>
                                <Col md={2}>{orderElement.generalPrice}р.</Col>
                                <Col md={2}>
                                    {orderElement.status}
                                </Col>
                                <Col md={3}>
                                    {
                                        orderElement.status === "Ожидание" ?
                                            <Button onClick={() => changeOrderStatus(orderElement, 'Выполняется')}>Начать работу</Button>
                                            :
                                            orderElement.status === "Выполняется" ?
                                                <Button onClick={() => changeOrderStatus(orderElement, 'Готов')}>Завершить заказ</Button>
                                                : <></>

                                    }
                                </Col>
                            </Row>
                        )}
                    </Card>
                </div>

            }

        </div >
    )
})

export default Order