import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const WashServiceForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', description: '', cost: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ name: '', description: '', cost: '' });
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
                Описание
                <Form.Control
                    type="text"
                    placeholder="Описание"
                    onChange={e => setPost({ ...post, description: e.target.value })}
                    value={post.description}
                />
                Цена
                <Form.Control
                    type="text"
                    placeholder="Цена"
                    onChange={e => setPost({ ...post, cost: e.target.value })}
                    value={post.cost}
                />
                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default WashServiceForm;