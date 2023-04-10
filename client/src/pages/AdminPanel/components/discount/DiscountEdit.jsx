import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const DiscountEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ name: '', numberVisits: '', discountPercentage: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            name: editPost.name,
            numberVisits: editPost.numberVisits,
            discountPercentage: editPost.discountPercentage,
        }
        edit(ePost)
    }

    return (
        <div>
            Название
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, role: e.target.value })}
                value={editPost.name}
            />
            Количество посещений
            <Form.Control
                type="text"
                placeholder={post.number}
                onChange={e => setEditPost({ ...editPost, numberVisits: e.target.value })}
                value={editPost.numberVisits}
            />
            Процент
            <Form.Control
                type="text"
                placeholder={post.address}
                onChange={e => setEditPost({ ...editPost, discountPercentage: e.target.value })}
                value={editPost.discountPercentage}
            />

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: '', numberVisits: '', discountPercentage: '' });
            }}>Обновить</Button>
        </div>
    );
};

export default DiscountEdit;