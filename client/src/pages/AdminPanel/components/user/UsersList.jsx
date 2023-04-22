import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const UserList = ({ posts, title, remove, view, roles, washes }) => {
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
                    <p>Роль: {roles.map((role) => user.roleId === role.id? `${role.role}`:'' )}</p>
                    <p>Автомойка: {washes.map((wash) => user.carWashId === wash.id? `${wash.name}`:'' )}</p>
                    <p>Создано: {user.createdAt}</p>
                    <p>Обновлено: {user.updatedAt}</p>
                    {console.log(user)}
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
                                <td>{roles.map((role) => role.id === post.roleId ? `${role.role}` : "")}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;