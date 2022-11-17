import { Request } from "express";

export interface LoginData{
    email: string,
    password: string
}

export interface UserData{
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    squad: string,
    is_admin: boolean
}

export interface TeamData{
    name: string,
    leader: string
}

export interface AuthenticatedUserRequest extends Request{
    userId: string
}

export interface AuthenticatedUserDataRequest extends Request{
    userId: string,
    userType: boolean,
    userEmail: string,
    userName: string
}