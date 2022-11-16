export interface IUserData {
    id: string;
    email: string;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    squad: string;
    is_admin: boolean;
    created_at: string;
    updated_at?: string;
    deleted_at?: string;
}