import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Route, Routes } from 'react-router-dom'
import { Context } from "../index.js";
import Home from "../pages/Home.jsx";
import { authRoutes, publicRoutes } from "../routes.jsx";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={Component} exect />
            }
            )}
            {publicRoutes.map(({ path, Component }) => {
                return <Route key={path} path={path} element={Component} exect />
            }
            )}
            <Route path="*" element={<Home/>}/>
        </Routes>
    );
});

export default AppRouter;