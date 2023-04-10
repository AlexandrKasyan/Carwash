import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const CarWashForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', number: '', address: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ name: '', number: '', address: '' });
    }
    return (
        <div>
            <form>
                Название
                <Form.Control
                    type="text"
                    placeholder="Название"
                    onChange={e => setPost({ ...post, name: e.target.value })}
                    value={post.name}
                />
                Номер телефона
                <Form.Control
                    type="text"
                    placeholder="Номер телефона"
                    onChange={e => setPost({ ...post, number: e.target.value })}
                    value={post.number}
                />
                Адресс
                <Form.Control
                    type="text"
                    placeholder="Адресс"
                    onChange={e => setPost({ ...post, address: e.target.value })}
                    value={post.address}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default CarWashForm;