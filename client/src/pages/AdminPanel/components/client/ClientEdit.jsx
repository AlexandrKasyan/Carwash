import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const ClientEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({  name: '', phoneNumber: '', userId: '', discountId: '' });
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            phoneNumber: editPost.phoneNumber,
            userId: editPost.userId,
            discountId: editPost.discountId
        }
        edit(ePost)
    }

    return (
        <div>
            Имя
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, role: e.target.value })}
                value={editPost.name}
            />
            Номер телефона
            <Form.Control
                type="text"
                placeholder={post.phoneNumber}
                onChange={e => setEditPost({ ...editPost, phoneNumber: e.target.value })}
                value={editPost.phoneNumber}
            />
            Пользователь
            <Form.Control
                type="text"
                placeholder={post.email}
                onChange={e => setEditPost({ ...editPost, userId: e.target.value })}
                value={editPost.userId}
            />
            Скидка
            <Form.Control
                type="text"
                placeholder={post.discountId}
                onChange={e => setEditPost({ ...editPost, discountId: e.target.value })}
                value={editPost.discountId}
            />
            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({  name: '', phoneNumber: '', userId: '', discountId: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default ClientEdit;