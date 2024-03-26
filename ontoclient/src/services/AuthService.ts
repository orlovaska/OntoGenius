import $api from "../http";
import axios, { AxiosResponse } from 'axios';
import { LoginResponse } from "../models/response/LoginResponse";
import { AUTH_CONTROLLER_ROUTE } from "../utils/consts"
import Cookies from "js-cookie";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        console.log("username внутри login: ", username)
        console.log("password внутри login: ", password)

        const result = axios.post<LoginResponse>(`/api${AUTH_CONTROLLER_ROUTE}/login`, { username: username, password: password })
        const response = await result;
        if (response) {
            const newAccessTokenToken =response.data.accessToken;
            localStorage.setItem('token', newAccessTokenToken);
            // TODO убрать установку куки с фронта на бек
            const newRefreshToken =response.data.refreshToken;
            Cookies.set('refreshToken', newRefreshToken);
        }

        return result;
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<any>> {
        //return $api.post<any>(`${AUTH_CONTROLLER_ROUTE}/register`, { username: username, email: email, password: password })
        // return axios.post<any>(`/api${AUTH_CONTROLLER_ROUTE}/register`, { username: username, email: email, password: password })
        return axios.post<any>(`/api${AUTH_CONTROLLER_ROUTE}/register`, { username: username, email: email, password: password })
    }
    
    static async logout(): Promise<void> {
        return $api.post(`/api${AUTH_CONTROLLER_ROUTE}/logout`)
    }

}
