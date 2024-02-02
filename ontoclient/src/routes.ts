import React from "react";
import { LOGIN_ROUTE } from "./utils/consts";
import Login from "./components/Login";
import Home from "./components/Home";

interface IRoute {
    path: string;
    Component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
    {
        path: LOGIN_ROUTE,
        Component: Login,
    },
];

export const privateRoutes: IRoute[] = [
    {
        path: LOGIN_ROUTE,
        Component: Home,
    },
];
