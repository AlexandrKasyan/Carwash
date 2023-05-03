import React from 'react'
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'
import { ADMIN_PANEL_BODY, ADMIN_PANEL_BRAND, ADMIN_PANEL_CAR, ADMIN_PANEL_CARWASHES, ADMIN_PANEL_CLIENTS, ADMIN_PANEL_CLIENT_CAR, ADMIN_PANEL_DISCOUNT, ADMIN_PANEL_ORDER, ADMIN_PANEL_ORDER_SERVICE_RELATION, ADMIN_PANEL_POST, ADMIN_PANEL_ROLE, ADMIN_PANEL_STAFF, ADMIN_PANEL_STATUS, ADMIN_PANEL_USERS, ADMIN_PANEL_WASH_SERVECE } from '../../../utils/const';

export const NavAdmin = observer(() => {
    const navigate = useNavigate();
    return (
        <div className="admin-list animation-left" style={{ color: 'white' }}>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_USERS)}>
                Пользователи
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_CLIENTS)}>
                Клиенты
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_CARWASHES)}>
                Автомойки
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_ROLE)}>
                Роли
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_DISCOUNT)} >
                Скидки
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_STAFF)}
            >
                Сотрудники
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_POST)}>
                Должности
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_BODY)}
            >
                Кузова
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_BRAND)}
            >
                Бренды
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_CAR)}
            >
                Автомобили
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_CLIENT_CAR)}
            >
                Автомобили клиентов
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_STATUS)}
            >
                Статусы
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_ORDER)}
            >
                Заказы
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_WASH_SERVECE)}
            >
                Услуги
            </Button>
            <Button
                variant={'outline-light'}
                className="mt-1"
                onClick={() => navigate(ADMIN_PANEL_ORDER_SERVICE_RELATION)}
            >
                Отношение услуг
            </Button>
        </div>
    )
});
