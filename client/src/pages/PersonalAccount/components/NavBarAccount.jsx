import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../..';
import { ACCOUNT_BASKET, ACCOUNT_CARS, ACCOUNT_ORDERS } from '../../../utils/const';

const NavBarAccount = observer( () => {
    const { selectedServices } = useContext(Context)
    const navigate = useNavigate();


    return (
        <div className='account-nav-bar'>
            <Nav>
                <Button
                    variant={'outline-light'}
                    onClick={() => navigate(ACCOUNT_CARS)}
                    className="btn-nav-bar-account" >
                    Автомобили
                </Button>
            </Nav>
            <Nav>
                <Button
                    variant={'outline-light'}
                    onClick={() => navigate(ACCOUNT_ORDERS)}
                    className="btn-nav-bar-account" >
                    Заказы
                </Button>
            </Nav>
            <Nav>
                <Button
                    variant={'outline-light'}
                    onClick={() => navigate(ACCOUNT_BASKET)}
                    className="btn-nav-bar-account" >
                    Корзина
                    <div>
                        <div className='account-basket-count'>{selectedServices.selectedServices.length ?
                            selectedServices.selectedServices.length :
                            0
                        }</div>
                    </div>

                </Button>
            </Nav>
        </div>
    )
})

export default NavBarAccount