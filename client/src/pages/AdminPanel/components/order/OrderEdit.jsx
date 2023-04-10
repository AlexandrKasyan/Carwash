import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const OrderEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ dateTime: '', generalPrice: '', clientId: '', statusId: '' });
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            dateTime: editPost.dateTime,
            generalPrice: editPost.generalPrice,
            clientId: editPost.clientId,
            statusId: editPost.statusId
        }
        edit(ePost)
    }

    return (
        <div>
            Время
            <Form.Control
                type="text"
                placeholder={post.dateTime}
                onChange={e => setEditPost({ ...editPost, dateTime: e.target.value })}
                value={editPost.dateTime}
            />
            Итоговая цена
            <Form.Control
                type="text"
                placeholder={post.generalPrice}
                onChange={e => setEditPost({ ...editPost, generalPrice: e.target.value })}
                value={editPost.generalPrice}
            />
            Клиент
            <Form.Control
                type="text"
                placeholder={post.clientId}
                onChange={e => setEditPost({ ...editPost, clientId: e.target.value })}
                value={editPost.clientId}
            />
            Статус
            <Form.Control
                type="text"
                placeholder={post.statusId}
                onChange={e => setEditPost({ ...editPost, statusId: e.target.value })}
                value={editPost.statusId}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({dateTime: '', generalPrice: '', clientId: '', statusId: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default OrderEdit;