import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const StaffEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ name: '', phoneNumber: '', position: '', userId: '', postId: '' });

    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            phoneNumber: editPost.phoneNumber,
            position: editPost.position,
            userId: editPost.userId,
            postId: editPost.postId
        }
        edit(ePost)
    }

    return (
        <div>
            Имя
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />
            Номер телефона
            <Form.Control
                type="text"
                placeholder={post.phoneNumber}
                onChange={e => setEditPost({ ...editPost, phoneNumber: e.target.value })}
                value={editPost.phoneNumber}
            />
            Позиция
            <Form.Control
                type="text"
                placeholder={post.position}
                onChange={e => setEditPost({ ...editPost, position: e.target.value })}
                value={editPost.position}
            />
            UserId
            <Form.Control
                type="text"
                placeholder={post.userId}
                onChange={e => setEditPost({ ...editPost, userId: e.target.value })}
                value={editPost.userId}
            />
            PostID
            <Form.Control
                type="text"
                placeholder={post.postId}
                onChange={e => setEditPost({ ...editPost, postId: e.target.value })}
                value={editPost.postId}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: '', phoneNumber: '', position: '', userId: '', postId: '' });
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default StaffEdit;