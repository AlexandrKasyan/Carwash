import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const StatusEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ name: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name
        }
        edit(ePost)
    }

    return (
        <div>
            <Form.Control
                type="text"
                placeholder="Название"
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({name: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default StatusEdit;