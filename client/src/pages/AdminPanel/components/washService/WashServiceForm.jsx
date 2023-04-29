import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const WashServiceForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', description: '', cost: 0});
    const [file, setFile] = useState(null)

    const addNewPost = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', post.name)
        formData.append('description', post.description)
        formData.append('cost', post.cost)
        formData.append('img', file)
        create(formData);
        setPost({ name: '', description: '', cost: '' });
    }

    const selectFile = e => {
        setFile(e.target.files[0])
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
                Фото
                <Form.Control
                    type="file"
                    onChange={selectFile}
                />


                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default WashServiceForm;