import React from "react";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";
import LoginForm from "./components/Authentication/LoginForm";
import Home from "./components/Home";
import RegistrationForm from "./components/Authentication/RegistrationForm";

interface IRoute {
    path: string;
    Component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
    {
        path: LOGIN_ROUTE,
        Component: LoginForm,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationForm,
    },
];

export const privateRoutes: IRoute[] = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
];
