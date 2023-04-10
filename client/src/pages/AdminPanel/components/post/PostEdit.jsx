import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const PostEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ name: '', duties: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            duties: editPost.duties
        }
        edit(ePost)
    }

    return (
        <div>
            Название должности
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />
            Обязанности
            <Form.Control
                type="text"
                placeholder={post.duties}
                onChange={e => setEditPost({ ...editPost, duties: e.target.value })}
                value={editPost.duties}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: '', duties: ''});
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default PostEdit;