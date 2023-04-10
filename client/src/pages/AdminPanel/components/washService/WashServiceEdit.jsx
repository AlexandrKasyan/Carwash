import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const WashServiceEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ name: '', description: '', cost: '' });
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            description: editPost.description,
            cost: editPost.cost
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
            Описание
            <Form.Control
                type="text"
                placeholder={post.description}
                onChange={e => setEditPost({ ...editPost, description: e.target.value })}
                value={editPost.description}
            />
            Цена
            <Form.Control
                type="text"
                placeholder={post.cost}
                onChange={e => setEditPost({ ...editPost, cost: e.target.value })}
                value={editPost.cost}
            />
           

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({name: '', description: '', cost: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default WashServiceEdit;