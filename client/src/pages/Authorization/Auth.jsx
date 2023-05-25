import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../..";
import { login, registration } from "../../http/userAPI";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../../utils/const";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const validateEmail = event => {
        if (!isValidEmail(event.target.value)) {
            setError('Email is invalid');
        } else {
            setError(null);
        }

        setEmail(event.target.value);
    };

    const click = async () => {
        try {
            if (email && password && !error) {
                let data;
                if (isLogin) {
                    data = await login(email, password);
                } else {
                    data = await registration(email, password);
                }
                user.setUser(data)
                user.setIsAuth(true)
                navigate(HOME_ROUTE)
            }
        } catch (e) {
            setErrorMessage(e.response.data.message)
        }
    }

    return (
        <div className="auth-wrap" style={{ backgroundImage: `url(background.jpg)` }}>
            <Container
                className="d-flex mt-5 justify-content-center align-items-center"
                style={{ height: window.innerHeight - 54 }}
            >
                <Card style={{ width: 600 }} className="p-5" >
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className={
                                `mt-3 ${error ?
                                    "input-red"
                                    :
                                    ''
                                }`
                            }
                            type="text"
                            placeholder='Введите e-mail'
                            value={email}
                            required
                            onChange={validateEmail}
                        />

                        <Form.Control
                            className="mt-3"
                            placeholder='Введите пароль'
                            type="password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form>
                    <Row
                        className="mt-1"
                        style={{
                            marginLeft: '0.2rem',
                            color: "#EB423C"
                        }}
                    >
                        {errorMessage ?
                            errorMessage
                            : ''
                        }
                    </Row>
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
                            </div>
                        }
                        <Button
                            onClick={click}
                            variant='outline-success'
                            className={
                                `mt-3 ${error ?
                                    "input-red"
                                    :
                                    ''
                                }`
                            }
                        >
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </Row>
                </Card>
            </Container>
        </div>
    );
});

export default Auth;