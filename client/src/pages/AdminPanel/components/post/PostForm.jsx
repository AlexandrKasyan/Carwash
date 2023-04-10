import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const PostForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', duties: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ name: '', duties: '' });
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
               Обязанности
                <Form.Control
                    type="text"
                    placeholder="Обязанности"
                    onChange={e => setPost({ ...post, duties: e.target.value })}
                    value={post.duties}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default PostForm;