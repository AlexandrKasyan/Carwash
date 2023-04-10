import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const StaffForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', phoneNumber: '', position: '', userId: '', postId: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ name: '', phoneNumber: '', position: '', userId: '', postId: '' });
    }
    return (
        <div>
            <form>
                Имя
                <Form.Control
                    type="text"
                    placeholder="Имя"
                    onChange={e => setPost({ ...post, name: e.target.value })}
                    value={post.name}
                />
                Номер телефона
                <Form.Control
                    type="text"
                    placeholder="Номер телефона"
                    onChange={e => setPost({ ...post, phoneNumber: e.target.value })}
                    value={post.phoneNumber}
                />
                Позиция
                <Form.Control
                    type="text"
                    placeholder="Позиция"
                    onChange={e => setPost({ ...post, position: e.target.value })}
                    value={post.position}
                />
                UserID
                <Form.Control
                    type="text"
                    placeholder="UserId"
                    onChange={e => setPost({ ...post, userId: e.target.value })}
                    value={post.userId}
                />
                PostID
                <Form.Control
                    type="text"
                    placeholder="PostId"
                    onChange={e => setPost({ ...post, postId: e.target.value })}
                    value={post.postId}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default StaffForm;