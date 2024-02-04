import axios from 'axios';
import React from 'react';
import { AuthResponse } from '../models/response/AuthResponse';
import AuthService from '../services/AuthService';
import { API_URL, AUTH_CONTROLLER_ROUTE } from '../utils/consts';

interface ILoginProps { }

const Login: React.FC<ILoginProps> = () => {
    //AuthService.registration('chelovekcelo', 'example@email.com', 'password123')
    //    .then(response => {
    //        console.log(response.data); // Assuming the response contains data property
    //    })
    //    .catch(error => {
    //        console.error('Registration failed:', error);
    //    });

    //axios.get<any>(
    //    `/api${AUTH_CONTROLLER_ROUTE}/getexamples`,
    //    //{
    //    //    withCredentials: true
    //    //}
    //)
    //    .then((response) => {
    //        console.log(response);
    //    })
    //    .catch((error) => {
    //        console.error('Error log:', error);
    //    });


    axios.post<any>(
        `/api${AUTH_CONTROLLER_ROUTE}/register`, { username: 'chelovekcelo', email: 'example@email.com', password: 'Password123!' },
    )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('Error log:', error);
        });
    return (
        <>
           Login
        </>
    );
};

export default Login;
