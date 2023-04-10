import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const UserList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица пользователи пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                    <p>Id: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>Пароль: {user.password}</p>
                    <p>Роль: {user.roleId}</p>
                    <p>Автомойка: {user.carWashId}</p>
                    <p>Создано: {user.createdAt}</p>
                    <p>Обновлено: {user.updatedAt}</p>

                    <Button onClick={() => {
                        remove(user)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, user)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Email</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setUser(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.email}</td>
                                <td>{post.roleId}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;