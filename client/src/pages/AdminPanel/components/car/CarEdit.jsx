import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const CarWashEdit = ({ edit, post, getClientList }) => {
    const [editPost, setEditPost] = useState({ number: '', yearRelease: '', bodyId: '', carBrandId: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            number: editPost.number,
            yearRelease: editPost.yearRelease,
            bodyId: editPost.bodyId,
            carBrandId: editPost.carBrandId
        }
        edit(ePost)
    }

    return (
        <div>
            Номер
            <Form.Control
                type="text"
                placeholder={post.number}
                onChange={e => setEditPost({ ...editPost, number: e.target.value })}
                value={editPost.number}
            />
            Год выпуска
            <Form.Control
                type="text"
                placeholder={post.yearRelease}
                onChange={e => setEditPost({ ...editPost, yearRelease: e.target.value })}
                value={editPost.yearRelease}
            />
            BodyID
            <Form.Control
                type="text"
                placeholder={post.bodyId}
                onChange={e => setEditPost({ ...editPost, bodyId: e.target.value })}
                value={editPost.bodyId}
            />
            CarBranId
            <Form.Control
                type="text"
                placeholder={post.carBrandId}
                onChange={e => setEditPost({ ...editPost, carBrandId: e.target.value })}
                value={editPost.carBrandId}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ number: '', yearRelease: '', bodyId: '', carBrandId: '' });
                getClientList()
            }}>Обновить</Button>
        </div>
    );
};

export default CarWashEdit;