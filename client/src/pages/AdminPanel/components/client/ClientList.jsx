import React from 'react';
import { Button } from "react-bootstrap";

const PostList = ({ posts, title, remove, view, getLocalStorage }) => {

    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }} >Таблица пользователи пуста</h1>
    }
    return (
        <div>

            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Email</th>
                        <th>Пароль</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map((post, index) =>
                            <tr key={post.id}>
                                <td>{post.id}.</td>
                                <td>{post.email}</td>

                                <td>{post.password}</td>

                                <td className="post__btn">
                                    <Button onClick={() => remove(post)}>Удалить</Button>
                                    <Button onClick={() => view(true, post)}>Обновить</Button>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default PostList;