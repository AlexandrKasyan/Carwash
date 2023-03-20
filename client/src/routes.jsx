import Admin from "./pages/AdminPanel/Admin";
import React from "react";
import { ADMIN_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/const";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <Admin/>
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
    }
];
