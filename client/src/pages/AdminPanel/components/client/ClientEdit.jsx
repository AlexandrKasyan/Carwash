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
            <Form.Control
                type="text"
                placeholder="Имя"
                onChange={e => setEditPost({ ...editPost, role: e.target.value })}
                value={editPost.name}
            />
            <Form.Control
                type="text"
                placeholder="Номер телефона"
                onChange={e => setEditPost({ ...editPost, phoneNumber: e.target.value })}
                value={editPost.phoneNumber}
            />
            <Form.Control
                type="text"
                placeholder="Пользователь"
                onChange={e => setEditPost({ ...editPost, userId: e.target.value })}
                value={editPost.userId}
            />
            <Form.Control
                type="text"
                placeholder="Скидка"
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