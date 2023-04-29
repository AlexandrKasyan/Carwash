import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const WashServiceEdit = ({ edit, post }) => {
    const [editPost, setEditPost] = useState({ name: '', description: '', cost: '' });
    const [file, setFile] = useState(null)

    const updatePost = (editPost) => {
        const formData = new FormData()
        formData.append('id', post.id)
        formData.append('name', editPost.name)
        formData.append('description', editPost.description)
        formData.append('cost', editPost.cost)
        formData.append('img', file)
        edit(formData)
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    return (
        <div>
            Название
            <Form.Control
                type="text"
                placeholder={post.name}
                onChange={e => setEditPost({ ...editPost, name: e.target.value })}
                value={editPost.name}
            />
            Описание
            <Form.Control
                type="text"
                placeholder={post.description}
                onChange={e => setEditPost({ ...editPost, description: e.target.value })}
                value={editPost.description}
            />
            Цена
            <Form.Control
                type="text"
                placeholder={post.cost}
                onChange={e => setEditPost({ ...editPost, cost: e.target.value })}
                value={editPost.cost}
            />

            Фото
            <Form.Control
                type="file"
                onChange={selectFile}
            />


            <Button onClick={() => {
                updatePost(editPost);
                setEditPost({ name: '', description: '', cost: '' });
            }}>Обновить</Button>
        </div>
    );
};

export default WashServiceEdit;