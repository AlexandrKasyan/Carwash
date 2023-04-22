import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const PostEdit = ({ edit, post, roles, washes }) => {
    const [editPost, setEditPost] = useState({ email: '', password: "", roleId: 2, carWashId: 1 });

    const updatePost = (editPost) => {
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

            <Form.Select name="Role"
                onChange={e => setEditPost({ ...editPost, roleId: e.target.value })}
                value={editPost.roleId}>
                {roles.map(role =>
                    <option
                        key={role.id}
                        value={role.id}>
                        {role.role}
                    </option>
                )}
            </Form.Select>
            <Form.Select name="Wahes"
                onChange={e => setEditPost({ ...editPost, carWashId: e.target.value })}
                value={editPost.carWashId}>
                {washes.map(wash =>
                    <option
                        key={wash.id}
                        value={wash.id}>
                        {wash.name}
                    </option>
                )}
            </Form.Select>
            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ email: "", password: "", roleId: '', carWashId: '' });
            }}>Обновить</Button>
        </div>
    );
};

export default PostEdit;