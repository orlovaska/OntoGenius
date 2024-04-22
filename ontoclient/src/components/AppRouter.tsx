// import React, { useEffect, useState } from "react";
// import {
//     Route,
//     Routes,
//     Navigate,
//     Router,
//     BrowserRouter,
//     Link,
//     useNavigate,
// } from "react-router-dom";
// import { useAppSelector } from "../hooks/redux";
// import { privateRoutes, publicRoutes } from "../routes";
// import { HOME_ROUTE, REGISTRATION_ROUTE, LOGIN_ROUTE} from "../utils/consts";

// const AppRouter: React.FC = () => {
//     const { user } = useAppSelector((state) => state.userReducer);

//     const [redirected, setRedirected] = useState(false);
//     console.log("user AppRouter: ", user);

//     return (
//         <BrowserRouter>
//             {user ? (
//                 <Navigate to={HOME_ROUTE} />
//             ) : (
//                 <Navigate to={LOGIN_ROUTE} />
//             )}
//             <Routes>
//                 {user
//                     ? privateRoutes.map(({ path, Component }) => (
//                           <>
//                               <Route
//                                   key={path}
//                                   path={path}
//                                   element={<Component />}
//                               />
//                           </>
//                       ))
//                     : publicRoutes.map(({ path, Component }) => (
//                           <Route
//                               key={path}
//                               path={path}
//                               element={<Component />}
//                           />
//                       ))}
//             </Routes>
//         </BrowserRouter>
//     );
// };

// export default AppRouter;

import { log } from "console";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, BrowserRouter, Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { privateRoutes, publicRoutes } from "../routes";
import { HOME_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const AppRouter: React.FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const [redirected, setRedirected] = useState(false);
    // let redirected = false;
    console.log("user AppRouter: ", user);

    const initialRedirect = (): React.ReactElement => {
        console.log("initialRedirect");
        if (!redirected) {
            // redirected = true;
            setRedirected(true);
            // return <Navigate to={LOGIN_ROUTE} />;
            if (user) {
                return <Navigate to={HOME_ROUTE} />;
            } else {
                return <Navigate to={LOGIN_ROUTE} />;
            }
        }
        console.log("Вернулся пустой");

        return <></>;
    };

    return (
        <BrowserRouter>
            {/* {user ? (
                <Navigate to={HOME_ROUTE} />
            ) : (
                <Navigate to={LOGIN_ROUTE} />
            )} */}
            {/* <Navigate to={LOGIN_ROUTE} /> */}
            {initialRedirect()}
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
                {/* Редирект пользователя */}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
