import React, { useEffect } from "react";
import {
    Route,
    Routes,
    Navigate,
    Router,
    BrowserRouter,
    Link,
    useNavigate,
} from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { privateRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const AppRouter: React.FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    console.log("user AppRouter: ", user);

    return (
        <BrowserRouter>
            {user ? (
                <Navigate to={HOME_ROUTE} />
            ) : (
                <Navigate to={REGISTRATION_ROUTE} />
            )}
            <Routes>
                {user
                    ? privateRoutes.map(({ path, Component }) => (
                          <>
                              <Route
                                  key={path}
                                  path={path}
                                  element={<Component />}
                              />
                          </>
                      ))
                    : publicRoutes.map(({ path, Component }) => (
                          <Route
                              key={path}
                              path={path}
                              element={<Component />}
                          />
                      ))}
            </Routes>
            {/* {user ? <Link to={HOME_ROUTE} /> : <Link to={REGISTRATION_ROUTE} />} */}
        </BrowserRouter>
    );
};

export default AppRouter;
