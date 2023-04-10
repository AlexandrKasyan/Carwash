import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const OrderServiceRelationEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ washServiceId: '', orderId: ''});
    
    const updatePost = (editPost) => {
        const ePost = {
            id: post.id,
            washServiceId: editPost.washServiceId,
            orderId: editPost.orderId
        }
        edit(ePost)
    }

    return (
        <div>
            washServiceId
            <Form.Control
                type="text"
                placeholder={post.washServiceId}
                onChange={e => setEditPost({ ...editPost, washServiceId: e.target.value })}
                value={editPost.washServiceId}
            />
            orderId
            <Form.Control
                type="text"
                placeholder={post.orderId}
                onChange={e => setEditPost({ ...editPost, orderId: e.target.value })}
                value={editPost.orderId}
            />
           
           

            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({washServiceId: '', orderId: ''});
            }}>Обновить</Button>
        </div>
    );
};

export default OrderServiceRelationEdit;