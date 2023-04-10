import React from 'react';
import { useState } from 'react';
import { Button } from "react-bootstrap";
import MyModal from '../../../../components/MyModal/MyModal';

const PostList = ({ posts, title, remove, view }) => {
    const [modal, setModal] = useState(false);
    const [post, setPost] = useState({});

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица должностей пуста</h1>
    }
    return (
        <div>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <div>
                <h2>Информация</h2>
                    <p>Id: {post.id}</p>
                    <p>Название: {post.name}</p>
                    <p>Обязанности: {post.duties}</p>
                    <p>Создано: {post.createdAt}</p>
                    <p>Обновлено: {post.updatedAt}</p>

                    <Button onClick={() => {
                        remove(post)
                        setModal(false)
                        }}>Удалить</Button>
                    <Button onClick={() => {
                        view(true, post)
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
                        <th>Обязанности</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post) =>
                            <tr
                                onClick={() => {
                                    setPost(post)
                                    setModal(true)
                                }}
                                key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.name}</td>
                                <td>{post.duties}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;