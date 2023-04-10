import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const CarWashList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [сarWash, setCarWash] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица автомек пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {сarWash.id}</p>
                    <p>Название: {сarWash.name}</p>
                    <p>Телефон: {сarWash.number}</p>
                    <p>Адресс: {сarWash.address}</p>
                    <p>Создано: {сarWash.createdAt}</p>
                    <p>Обновлено: {сarWash.updatedAt}</p>

                    <Button onClick={() => {
                        remove(сarWash)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, сarWash)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Название</th>
                        <th>Адресс</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setCarWash(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                                <td>{post.address}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default CarWashList;