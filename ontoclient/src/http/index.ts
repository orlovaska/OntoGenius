import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginResponse } from "../models/response/LoginResponse";
import { API_URL, AUTH_CONTROLLER_ROUTE } from '../utils/consts';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            console.log("Был запрос на refresh");
            // document.cookie = 
            // const response = await axios.post<LoginResponse>(`${API_URL}${AUTH_CONTROLLER_ROUTE}/refresh`, { withCredentials: true })
            const accessToken = localStorage.getItem('token');
            const refreshToken = Cookies.get('refreshToken');
            const response = await axios.post<LoginResponse>(`${API_URL}${AUTH_CONTROLLER_ROUTE}/refresh`, { accessToken: accessToken, refreshToken: refreshToken })
            const newAccessTokenToken =response.data.accessToken;
            localStorage.setItem('token', newAccessTokenToken);
            // TODO убрать установку куки с фронта на бек
            // Установка refreshToken в куку без указания срока истечения
            const newRefreshToken =response.data.refreshToken;
            Cookies.set('refreshToken', newRefreshToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error;
})

export default $api;
