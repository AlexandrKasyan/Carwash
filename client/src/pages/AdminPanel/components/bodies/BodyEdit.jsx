import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const PostEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ name: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
        }
        edit(ePost)
    }

    return (
        <div>
            Название кузова
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: ''});
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default PostEdit;