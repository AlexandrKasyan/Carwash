import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const ClientForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', phoneNumber: '', userId: '', discountId: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({  name: '', phoneNumber: '', userId: '', discountId: '' });
    }
    return (
        <div>
            <form>
                <Form.Control
                    type="text"
                    placeholder="Имя"
                    onChange={e => setPost({ ...post, role: e.target.value })}
                    value={post.name}
                />
                <Form.Control
                    type="text"
                    placeholder="Номер телефона"
                    onChange={e => setPost({ ...post, phoneNumber: e.target.value })}
                    value={post.phoneNumber}
                />
                <Form.Control
                    type="text"
                    placeholder="Пользователь"
                    onChange={e => setPost({ ...post, userId: e.target.value })}
                    value={post.userId}
                />
                <Form.Control
                    type="text"
                    placeholder="Скидка"
                    onChange={e => setPost({ ...post, discountId: e.target.value })}
                    value={post.discountId}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default ClientForm;