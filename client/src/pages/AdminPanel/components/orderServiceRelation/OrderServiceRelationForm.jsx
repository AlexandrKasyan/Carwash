import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const OrderServiceRelationForm = ({ create }) => {
    const [post, setPost] = useState({ washServiceId: '', orderId: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ washServiceId: '', orderId: '' });
    }
    return (
        <div>
            <form>
            washServiceId
                <Form.Control
                    type="text"
                    placeholder="washServiceId"
                    onChange={e => setPost({ ...post, washServiceId: e.target.value })}
                    value={post.washServiceId}
                />
                orderId
                <Form.Control
                    type="text"
                    placeholder="orderId"
                    onChange={e => setPost({ ...post, orderId: e.target.value })}
                    value={post.orderId}
                />
                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default OrderServiceRelationForm;