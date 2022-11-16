import { Request, Response } from 'express';

import { AuthServices } from '../services/authenticate';

export class AuthController
{
    private authServices : AuthServices;

    constructor()
    {
        this.authServices = new AuthServices();
    }

    public async login(req: Request, res: Response)
    {
        const result = await this.authServices.login();
    }

    public logout(req: Request, res: Response)
    {
        res.clearCookie('token');
        res.status(200).json();
    }
}