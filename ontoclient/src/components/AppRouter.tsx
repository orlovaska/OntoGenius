import React from "react";
import {
    Route,
    Routes,
    Navigate,
    Router,
    BrowserRouter,
} from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { privateRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AppRouter: React.FC = () => {
    const user =null;

    // const user = useAppSelector((state) => state.userReducer.user);
    console.log("user: ", user);
    return (
        <BrowserRouter>
            {user ? (
                <Navigate to={HOME_ROUTE} />
            ) : (
                <Navigate to={LOGIN_ROUTE} />
            )}
            <Routes>
                {user
                    ? privateRoutes.map(({ path, Component }) => (
                          <Route
                              key={path}
                              path={path}
                              element={<Component />}
                          />
                      ))
                    : publicRoutes.map(({ path, Component }) => (
                          <Route
                              key={path}
                              path={path}
                              element={<Component />}
                          />
                      ))}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
