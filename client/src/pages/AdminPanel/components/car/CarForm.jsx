import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const CarForm = ({ create }) => {
    const [post, setPost] = useState({ number: '', yearRelease: '', bodyId: '', carBrandId: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ number: '', yearRelease: '', bodyId: '', carBrandId: '' });
    }
    return (
        <div>
            <form>
                Номер автомобиля
                <Form.Control
                    type="text"
                    placeholder="Номер"
                    onChange={e => setPost({ ...post, number: e.target.value })}
                    value={post.number}
                />
               Год выпуска автомобиля
                <Form.Control
                    type="text"
                    placeholder="Год выпуска"
                    onChange={e => setPost({ ...post, yearRelease: e.target.value })}
                    value={post.yearRelease}
                />
                BobyID
                <Form.Control
                    type="text"
                    placeholder="BobyID"
                    onChange={e => setPost({ ...post, bodyId: e.target.value })}
                    value={post.bodyId}
                />
                CarBrandID
                <Form.Control
                    type="text"
                    placeholder="CarBrandID"
                    onChange={e => setPost({ ...post, carBrandId: e.target.value })}
                    value={post.carBrandId}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default CarForm;