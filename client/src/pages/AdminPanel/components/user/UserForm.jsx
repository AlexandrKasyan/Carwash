import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const PostForm = ({ create }) => {
    const [post, setPost] = useState({ email: '', password: '', roleId: 1 });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ email: '', password: '', roleId: 1 });
    }
    return (
        <div>
            <form>
                <Form.Control
                    type="text"
                    placeholder="Название"
                    onChange={e => setPost({ ...post, email: e.target.value })}
                    value={post.email}
                />
                <Form.Control
                    type="text"
                    placeholder="Описание"
                    onChange={e => setPost({ ...post, password: e.target.value })}
                    value={post.password}
                />
                <Form.Control
                    type="text"
                    placeholder="Role"
                    onChange={e => setPost({ ...post, roleId: e.target.value })}
                    value={post.roleId}
                />
                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default PostForm;