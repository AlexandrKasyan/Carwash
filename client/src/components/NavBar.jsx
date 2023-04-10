import React, { useContext } from 'react'
import { Context } from '..'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from '../utils/const';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom'

export const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token','')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink style={{ color: 'white' }} to={HOME_ROUTE}>CarWash</NavLink>
                {
                    user.isAuth ?
                        <Nav className="ms-auto" style={{ color: 'white' }}>
                            <Button
                                variant={'outline-light'}
                                onClick={() => {
                                    logOut()
                                    navigate(LOGIN_ROUTE)
                                }}
                            >Выйти
                            </Button>
                            <Button
                                variant={'outline-light'}
                                onClick={() => navigate(ADMIN_ROUTE)}
                                className="ms-2" >
                                Админ панель
                            </Button>
                        </Nav>
                        :
                        <Nav className="ms-auto" style={{ color: 'white' }}>
                            <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Аторизация</Button>
                        </Nav>
                }

            </Container>
        </Navbar>
    )
});
