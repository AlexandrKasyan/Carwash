import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const StatusList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица статусов пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {status.id}</p>
                    <p>Название: {status.name}</p>
                    <p>Создано: {status.createdAt}</p>
                    <p>Обновлено: {status.updatedAt}</p>

                    <Button onClick={() => {
                        remove(status)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, status)
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
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setStatus(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default StatusList;