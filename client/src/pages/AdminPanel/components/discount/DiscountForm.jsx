import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const DiscountForm = ({ create }) => {
    const [post, setPost] = useState({ name: '', numberVisits: '', discountPercentage: '' });


    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({name: '', numberVisits: '', discountPercentage: ''  });
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
                Количество посещений
                <Form.Control
                    type="text"
                    placeholder="Количество посещений"
                    onChange={e => setPost({ ...post, numberVisits: e.target.value })}
                    value={post.numberVisits}
                />
                Процент
                <Form.Control
                    type="text"
                    placeholder="Процент"
                    onChange={e => setPost({ ...post, discountPercentage: e.target.value })}
                    value={post.discountPercentage}
                />

                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default DiscountForm;