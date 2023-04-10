import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const RoleList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [role, setRole] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица ролей пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {role.id}</p>
                    <p>Имя: {role.role}</p>
                    <p>Создано: {role.createdAt}</p>
                    <p>Обновлено: {role.updatedAt}</p>

                    <Button onClick={() => {
                        remove(role)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, role)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Роль</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setRole(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.role}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default RoleList;