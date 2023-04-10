import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const OrderForm = ({ create }) => {
    const [post, setPost] = useState({ dateTime: '', generalPrice: '', clientId: '', statusId: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ dateTime: '', generalPrice: '', clientId: '', statusId: '' });
    }
    return (
        <div>
            <form>
            Время
                <Form.Control
                    type="text"
                    placeholder="Время"
                    onChange={e => setPost({ ...post, dateTime: e.target.value })}
                    value={post.dateTime}
                />
                Цена
                <Form.Control
                    type="text"
                    placeholder="Цена"
                    onChange={e => setPost({ ...post, generalPrice: e.target.value })}
                    value={post.generalPrice}
                />
                Клиент
                <Form.Control
                    type="text"
                    placeholder="Клиент"
                    onChange={e => setPost({ ...post, clientId: e.target.value })}
                    value={post.clientId}
                />
                Статус
                <Form.Control
                    type="text"
                    placeholder="Статус"
                    onChange={e => setPost({ ...post, statusId: e.target.value })}
                    value={post.statusId}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default OrderForm;