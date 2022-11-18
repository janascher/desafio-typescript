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
    is_admin: boolean
}

export interface TeamData{
    name: string,
    leader: string
}

export interface AuthenticatedUserDataRequest extends Request{
    userId: string,
    userType: boolean,
    userEmail: string,
    userName: string
}

export interface PatchData<T> {
    id: string,
    data: Partial<T>
}

export interface UpdateQuery {
    columns: string,
    references: string,
    values: any[]
}