import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const CarWashList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [сar, setCar] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица атомобилей пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {сar.id}</p>
                    <p>Номер: {сar.number}</p>
                    <p>Год выпуска: {сar.yearRelease}</p>
                    <p>BodyID: {сar.bodyId}</p>
                    <p>CarBrandID: {сar.carBrandId}</p>
                    <p>Создано: {сar.createdAt}</p>
                    <p>Обновлено: {сar.updatedAt}</p>

                    <Button onClick={() => {
                        remove(сar)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, сar)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Номер</th>
                        <th>Год выпуска</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setCar(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.number}</td>
                                <td>{post.yearRelease}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default CarWashList;