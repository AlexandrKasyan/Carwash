import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const RoleForm = ({ create }) => {
    const [post, setPost] = useState({ role: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ role: '' });
    }
    return (
        <div>
            <form>
                Название
                <Form.Control
                    type="text"
                    placeholder="Название"
                    onChange={e => setPost({ ...post, role: e.target.value })}
                    value={post.role}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default RoleForm;