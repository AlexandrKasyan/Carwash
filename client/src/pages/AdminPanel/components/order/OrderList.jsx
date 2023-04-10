import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const OrderList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [order, setOrder] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица заказов пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {order.id}</p>
                    <p>Время: {order.dateTime}</p>
                    <p>Итого: {order.generalPrice}</p>
                    <p>Клиент: {order.clientId}</p>
                    <p>Статус: {order.statusId}</p>
                    <p>Создано: {order.createdAt}</p>
                    <p>Обновлено: {order.updatedAt}</p>

                    <Button onClick={() => {
                        remove(order)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, order)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Время</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setOrder(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.dateTime}</td>
                                <td>{post.generalPrice}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;