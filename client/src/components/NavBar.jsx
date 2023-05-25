import React, { useContext } from 'react'
import { Context } from '..'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ACCOUNT, ADMIN_ROUTE, CONTACTS, HOME_ROUTE, LOGIN_ROUTE, ONLINE_CAM, STAFF_PANEL, WASH_SERVECE } from '../utils/const';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom'
import './styleNavBar.css'

export const NavBar = observer(() => {
    const { user } = useContext(Context)
    const { selectedServices } = useContext(Context)
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
            <Nav>
                <NavLink className='link-page' to={ONLINE_CAM}>online-трансляция</NavLink>
            </Nav>

            {
                user.isAuth ?
                    <Nav>
                        {
                            user.user.role === "ADMIN" ?
                                <NavLink className="user-email-nav" to={ADMIN_ROUTE}>
                                    <div className="user-email-nav-first-s">{user.user.email[0].toUpperCase()}</div>
                                    <div className="user-email-nav-full">{user.user.email}</div>
                                </NavLink>
                                : <div></div>
                        }
                        {
                            user.user.role === "STAFF" ?
                                <NavLink className="user-email-nav" to={STAFF_PANEL}>
                                    <div className="user-email-nav-first-s">{user.user.email[0].toUpperCase()}</div>
                                    <div className="user-email-nav-full">{user.user.email}</div>
                                </NavLink>
                                : <div></div>
                        }
                        {
                            user.user.role === "USER" ?
                                <NavLink className="user-email-nav" to={ACCOUNT}>
                                    <div className="user-email-nav-first-s">{user.user.email[0].toUpperCase()}</div>
                                    <div className="user-email-nav-full">{user.user.email}</div>
                                    <div>
                                        {selectedServices.selectedServices.length ?
                                            <div className="client-service-count">{selectedServices.selectedServices.length}</div> :
                                            ''
                                        }

                                    </div>

                                </NavLink>
                                : <div></div>
                        }

                    </Nav>
                    :
                    <Nav className="btn-authorization" style={{ color: 'white' }}>
                        <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Аторизация</Button>
                    </Nav>
            }



        </Navbar>
    )
});
