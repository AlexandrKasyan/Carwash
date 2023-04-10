import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const ClientList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [client, setClient] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица клиентов пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {client.id}</p>
                    <p>Имя: {client.name}</p>
                    <p>Телефон: {client.phoneNumber}</p>
                    <p>Создано: {client.createdAt}</p>
                    <p>Обновлено: {client.updatedAt}</p>
                    <p>Пользователь: {client.userId}</p>
                    <p>Скидка: {client.discountId}</p>

                    <Button onClick={() => {
                        remove(client)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, client)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя</th>
                        <th>Пользователь</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setClient(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                                <td>{post.userId}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;