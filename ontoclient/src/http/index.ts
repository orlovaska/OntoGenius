import axios from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
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
            const response = await axios.post<AuthResponse>(`${API_URL}${AUTH_CONTROLLER_ROUTE}/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('Õ≈ ¿¬“Œ–»«Œ¬¿Õ')
        }
    }
    throw error;
})

export default $api;