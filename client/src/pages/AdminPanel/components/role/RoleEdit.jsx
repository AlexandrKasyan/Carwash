import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const RoleEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ role: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            role: editPost.role,
        }
        edit(ePost)
    }

    return (
        <div>
            Название
            <Form.Control
                type="text"
                placeholder={post.role}
                onChange={e => setEditPost({ ...editPost, role: e.target.value })}
                value={editPost.role}
            />
            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ role: '' });
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default RoleEdit;