import { Request, Response } from 'express';

import { AuthServices } from '../services/authenticate';
import { LoginData } from '../models/interfaces';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class AuthController
{
    private authServices : AuthServices;

    constructor(service : AuthServices)
    {
        this.authServices = service;
    }

    public async login(req: Request, res: Response)
    {
        const loginData : LoginData = req.body;
        const result = await this.authServices.login(loginData);

        if (result.error === null) {
            const { userId, userType, userEmail, userName } = result;
            const alreadyHasToken = req.cookies.token;
            if (alreadyHasToken) { res.clearCookie('token'); };
            if (process.env.JWT_SECRET){
                const token = jwt.sign({ userId: userId, userType: userType, userEmail: userEmail, userName: userName }, process.env.JWT_SECRET, { expiresIn: 7200 });
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ userType });
            }     
        } else {
            res.status(result.status).json({message: result.error});
        };        
    }

    public logout(req: Request, res: Response)
    {
        res.clearCookie('token');
        res.status(200).json({message:'Logout realizado'});
    }
}