import React, { useContext } from 'react'
import { Context } from '..'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ACCOUNT, ADMIN_ROUTE, CONTACTS, HOME_ROUTE, LOGIN_ROUTE, WASH_SERVECE } from '../utils/const';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom'
import './styleNavBar.css'

export const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    return (
        <Navbar className='nav-bar'>
            <Nav>
                <NavLink className='link-home' to={HOME_ROUTE}>CarWash</NavLink>
            </Nav>

            <Nav>
                <NavLink className='link-page' to={HOME_ROUTE}>Главная</NavLink>
            </Nav>
            <Nav>
                <NavLink className='link-page' to={WASH_SERVECE}>Услуги</NavLink>

            </Nav>
            <Nav>
                <NavLink className='link-page' to={CONTACTS}>Контакты</NavLink>
            </Nav>

            {
                user.isAuth ?
                    <Nav>
                        {
                            user.user.role === "ADMIN" ?
                                <Button
                                    variant={'outline-light'}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="" >
                                    Админ панель
                                </Button>
                                : <div></div>
                        }
                        {
                            user.user.role === "STAFF" ?
                                <Button
                                    variant={'outline-light'}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="" >
                                    Админ панель
                                </Button>
                                : <div></div>
                        }
                        <NavLink className="user-email-nav" to={ACCOUNT}>
                            <div className="user-email-nav-first-s">{user.user.email[0]}</div>
                            <div className="user-email-nav-full">{user.user.email}</div>
                        </NavLink>
                    </Nav>
                    :
                    <Nav className="btn-authorization" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Аторизация</Button>
                    </Nav>
            }



        </Navbar>
    )
});
