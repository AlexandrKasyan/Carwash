import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const ClientCarEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ clientId: '', carId: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            clientId: editPost.clientId,
            carId: editPost.carId,
        }
        edit(ePost)
    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="carId"
                onChange={e => setEditPost({ ...editPost, clientId: e.target.value })}
                value={editPost.clientId}
            />
            <Form.Control
                type="text"
                placeholder="carId"
                onChange={e => setEditPost({ ...editPost, carId: e.target.value })}
                value={editPost.carId}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ clientId: '', carId: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default ClientCarEdit;