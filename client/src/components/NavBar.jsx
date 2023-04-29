import React, { useContext } from 'react'
import { Context } from '..'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ACCOUNT, ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, WASH_SERVECE } from '../utils/const';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom'
import './styleNavBar.css'

export const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className='link-page' to={HOME_ROUTE}>CarWash</NavLink>
                <NavLink className='link-page' to={WASH_SERVECE}>Услуги</NavLink>
                {
                    user.isAuth ?
                        <Nav>
                            {
                                user.user.role === "ADMIN" ?
                                    <Button
                                        variant={'outline-light'}
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                        className="ms-5 ms-auto" >
                                        Админ панель
                                    </Button>
                                    : <div></div>
                            }
                            <NavLink className="ms-4  user-email-nav"  to={ACCOUNT}> <div className="user-email-nav-first-s">{user.user.email[0]}</div> <div className="user-email-nav-full">{user.user.email}</div></NavLink>
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
