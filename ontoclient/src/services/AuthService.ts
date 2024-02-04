import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { AUTH_CONTROLLER_ROUTE } from "../utils/consts"

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${AUTH_CONTROLLER_ROUTE}/refresh`, { email, password })
    }

    static async registration(username: string, email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${AUTH_CONTROLLER_ROUTE}/register`, { username, email, password })
    }

    static async logout(): Promise<void> {
        return $api.post(`${AUTH_CONTROLLER_ROUTE}/logout`)
    }

}