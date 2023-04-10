import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const StaffList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [staff, setStaff] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица сотрудников пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {staff.id}</p>
                    <p>Имя: {staff.name}</p>
                    <p>Позиция: {staff.position}</p>
                    <p>Телефон: {staff.phoneNumber}</p>
                    <p>USerID: {staff.userId}</p>
                    <p>PostID: {staff.postId}</p>
                    <p>Создано: {staff.createdAt}</p>
                    <p>Обновлено: {staff.updatedAt}</p>

                    <Button onClick={() => {
                        remove(staff)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, staff)
                        setModal(false)
                    }}>Обновить</Button>
                </div>
            </MyModal>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Имя </th>
                        <th>Должность</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setStaff(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                                <td>{post.postId}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default StaffList;