import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";


const PostForm = ({ create, roles, washes }) => {
    const [post, setPost] = useState({ email: '', password: '', roleId: 2, carWashId: 1 });

    const addNewPost = (e) => {
        e.preventDefault();
        create(post);
        setPost({ email: '', password: '', roleId: '', carWashId: '' });
    }

    return (
        <div>
            <form>
                <Form.Control
                    type="text"
                    placeholder="email"
                    onChange={e => setPost({ ...post, email: e.target.value })}
                    value={post.email}
                />
                <Form.Control
                    type="text"
                    placeholder="Пароль"
                    onChange={e => setPost({ ...post, password: e.target.value })}
                    value={post.password}
                />
                <Form.Select name="Role"
                    onChange={e => setPost({ ...post, roleId: e.target.value })}
                    value={post.roleId}>
                    {roles.map(role =>
                        <option
                            key={role.id}
                            value={role.id}>
                            {role.role}
                        </option>
                    )}
                </Form.Select>
                <Form.Select name="Wahes"
                    onChange={e => setPost({ ...post, carWashId: e.target.value })}
                    value={post.carWashId}>
                    {washes.map(wash =>
                        <option
                            key={wash.id}
                            value={wash.id}>
                            {wash.name}
                        </option>
                    )}
                </Form.Select>
                <Form.Control
                    type="text"
                    placeholder="Автомойка"
                    onChange={e => setPost({ ...post, carWashId: e.target.value })}
                    value={post.carWashId}
                />
                <Button onClick={addNewPost}>Create</Button>
            </form>
        </div>
    );
};

export default PostForm;