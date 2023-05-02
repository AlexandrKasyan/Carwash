import Admin from "./pages/AdminPanel/Admin";
import React from "react";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ADMIN_PANEL_USERS, ADMIN_PANEL_CLIENTS, ADMIN_PANEL_CARWASHES, ADMIN_PANEL_ROLE, ADMIN_PANEL_DISCOUNT, ADMIN_PANEL_POST, ADMIN_PANEL_STAFF, ADMIN_PANEL_BODY, ADMIN_PANEL_BRAND, ADMIN_PANEL_CAR, ADMIN_PANEL_CLIENT_CAR, ADMIN_PANEL_STATUS, ADMIN_PANEL_ORDER, ADMIN_PANEL_WASH_SERVECE, ADMIN_PANEL_ORDER_SERVICE_RELATION, ACCOUNT, CLIENT_INFO, WASH_SERVECE, ACCOUNT_CARS, ACCOUNT_BASKET, ACCOUNT_ORDERS } from "./utils/const";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Users from "./pages/AdminPanel/components/user/Users";
import Clients from "./pages/AdminPanel/components/client/Clients";
import CarWash from "./pages/AdminPanel/components/carWash/CarWash";
import Role from "./pages/AdminPanel/components/role/Role";
import Discount from "./pages/AdminPanel/components/discount/Discount";
import Post from "./pages/AdminPanel/components/post/Post";
import Staff from "./pages/AdminPanel/components/staff/Staff";
import Body from "./pages/AdminPanel/components/bodies/Body";
import Brand from "./pages/AdminPanel/components/brand/Brand";
import Car from "./pages/AdminPanel/components/car/Car";
import ClientCar from "./pages/AdminPanel/components/clientCar/ClientsCar";
import Status from "./pages/AdminPanel/components/status/Status";
import Order from "./pages/AdminPanel/components/order/Order";
import WashService from "./pages/AdminPanel/components/washService/WashService";
import OrderServiceRelation from "./pages/AdminPanel/components/orderServiceRelation/OrderServiceRelation";
import Account from "./pages/PersonalAccount/Account";
import ClientForm from "./pages/PersonalAccount/components/ClientForm";
import Services from "./pages/Services/Services";
import PersonalClientCar from "./pages/PersonalAccount/components/PersonalClientCar";
import SelectedService from "./pages/PersonalAccount/components/SelectedService";
import ClientOrder from "./pages/PersonalAccount/components/order/ClientOrder";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
    },
    {
        path: ACCOUNT,
        Component: <Account/>
    },
    {
        path: CLIENT_INFO,
        Component: <ClientForm/>
    },
    {
        path: ADMIN_PANEL_USERS,
        Component: <Users/>
    },
    {
        path: ADMIN_PANEL_CLIENTS,
        Component: <Clients/>
    },
    {
        path: ADMIN_PANEL_CARWASHES,
        Component: <CarWash/>
    },
    {
        path: ADMIN_PANEL_ROLE,
        Component: <Role/>
    },
    {
        path: ADMIN_PANEL_DISCOUNT,
        Component: <Discount/>
    },
    {
        path: ADMIN_PANEL_POST,
        Component: <Post/>
    },
    {
        path: ADMIN_PANEL_STAFF,
        Component: <Staff/>
    }, 
    {
        path: ADMIN_PANEL_BODY,
        Component: <Body/>
    },
    {
        path: ADMIN_PANEL_BRAND,
        Component: <Brand/>
    },
    {
        path: ADMIN_PANEL_CAR,
        Component: <Car/>
    },
    {
        path: ADMIN_PANEL_CLIENT_CAR,
        Component: <ClientCar/>
    },
    {
        path: ADMIN_PANEL_STATUS,
        Component: <Status/>
    },
    {
        path: ADMIN_PANEL_ORDER,
        Component: <Order/>
    },
    {
        path: ADMIN_PANEL_WASH_SERVECE,
        Component: <WashService/>
    },
    {
        path: ADMIN_PANEL_ORDER_SERVICE_RELATION,
        Component: <OrderServiceRelation/>
    },
    {
        path: ACCOUNT_CARS,
        Component: <PersonalClientCar/>
    },
    {
        path: ACCOUNT_BASKET,
        Component: <SelectedService/>
    },
    {
        path: ACCOUNT_ORDERS,
        Component: <ClientOrder/>
    }
];
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth/>
    },
    {
        path: HOME_ROUTE,
        Component: <Home/>
    },
    {
        path: WASH_SERVECE,
        Component: <Services/>
    }
];
