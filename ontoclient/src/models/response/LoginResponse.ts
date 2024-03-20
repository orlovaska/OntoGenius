import { IUser } from "../IUser";

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    //expiration: Date,
    user: IUser;
}