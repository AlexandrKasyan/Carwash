import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const PostEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ email: "", password: "", roleId: 1, carWashId: 1 });

    const updatePost = (editPost) =>{
        const ePost = {
            id: post.id,
            email: editPost.email,
            password: editPost.password,
            roleId: editPost.roleId,
            carWashId: editPost.carWashId
        }
        edit(ePost)
    }

    return (
        <div>
            <Form.Control
                type="text"
                className="mt-3"
                placeholder={post.email}
                onChange={e => setEditPost({ ...editPost, email: e.target.value })}
                value={editPost.email}
            />
            <Form.Control
                type="text"
                placeholder="password"
                className="mt-3"
                onChange={e => setEditPost({ ...editPost, password: e.target.value })}
                value={editPost.password}
            />
            <Form.Control
                type="text"
                placeholder={"RoleID"}
                className="mt-3"
                onChange={e => setEditPost({ ...editPost, roleId: e.target.value })}
                value={editPost.roleId}
            />
            <Form.Control
                type="text"
                placeholder={"CarWashId"}
                className="mt-3"
                onChange={e => setEditPost({ ...editPost, carWashId: e.target.value })}
                value={editPost.carWashId}
            />
            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ email: "", password: "", roleId: 1, carWashId: 1});
            }}>Обновить</Button>
        </div>
    );
};

export default PostEdit;