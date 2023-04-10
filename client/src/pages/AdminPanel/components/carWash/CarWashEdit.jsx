import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const CarWashEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ name: '', number: '', address: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            number: editPost.number,
            address: editPost.address,
        }
        edit(ePost)
    }

    return (
        <div>
            Название
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />
            Номер телефона
            <Form.Control
                type="text"
                placeholder={post.number}
                onChange={e => setEditPost({ ...editPost, number: e.target.value })}
                value={editPost.number}
            />
            Адресс
            <Form.Control
                type="text"
                placeholder={post.address}
                onChange={e => setEditPost({ ...editPost, address: e.target.value })}
                value={editPost.address}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: '', number: '', address: '' });
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default CarWashEdit;