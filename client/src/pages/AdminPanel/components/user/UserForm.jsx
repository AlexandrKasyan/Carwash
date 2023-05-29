import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form'


const PostForm = ({ create, roles, washes }) => {
    const [post, setPost] = useState({ email: '', password: '', roleId: 2, carWashId: 1 });


    const addNewPost = (e) => {
        e.preventDefault();

        create(post);
        setPost({ email: '', password: '', roleId: '', carWashId: '' });
    }

    return (
        <div>
            <Form>
                <h5
                    style={{
                        textAlign: 'center'
                    }}>Добавление пользователя</h5>
                <div id='error-box'
                    className='mb-2'
                    style={
                        post.email && post.password ?
                            {
                                display: 'none'
                            } :
                            {
                                display: 'block',
                                textAlign: 'center',
                                color: 'red'
                            }
                    }
                >Заполните все поля</div>
                <Form.Control
                    className='mb-2'
                    type="text"
                    placeholder="email"
                    onChange={e => setPost({ ...post, email: e.target.value })}
                    required={true}
                    value={post.email}
                />
                <Form.Control
                    className='mb-2'
                    type="text"
                    placeholder="Пароль"
                    onChange={e => setPost({ ...post, password: e.target.value })}
                    required={true}
                    value={post.password}
                />
                <Form.Select name="Role"
                    className='mb-2'
                    onChange={e => setPost({ ...post, roleId: e.target.value })}
                    value={post.roleId}
                    required={true}
                >
                    {roles.map(role =>
                        <option
                            key={role.id}
                            value={role.id}>
                            {role.role}
                        </option>
                    )}
                </Form.Select>
                <Form.Select name="Wahes"
                    className='mb-2'
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
                <Button
                    disabled={
                        post.email && post.password ?
                            false : true
                    }
                    onClick={addNewPost}>
                    Добавить
                </Button>
            </Form >
        </div >
    );
};

export default PostForm;