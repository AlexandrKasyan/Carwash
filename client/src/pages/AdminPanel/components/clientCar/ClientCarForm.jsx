import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const ClientCarForm = ({ create }) => {
    const [post, setPost] = useState({ clientId: '', carId: ''});


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ clientId: '', carId: ''});
    }
    return (
        <div>
            <form>
                <Form.Control
                    type="text"
                    placeholder="clientId"
                    onChange={e => setPost({ ...post, clientId: e.target.value })}
                    value={post.name}
                />
                <Form.Control
                    type="text"
                    placeholder="carId"
                    onChange={e => setPost({ ...post, carId: e.target.value })}
                    value={post.carId}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default ClientCarForm;