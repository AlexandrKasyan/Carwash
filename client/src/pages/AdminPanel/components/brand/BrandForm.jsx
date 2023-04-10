import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const BrandForm = ({ create }) => {
    const [post, setPost] = useState({ name: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ name: '' });
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

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default BrandForm;