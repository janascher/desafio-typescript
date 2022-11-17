import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserServices } from '../services/users';
import { UserData, AuthenticatedUserRequest } from '../models';
import jwt from 'jsonwebtoken';

export class UserController
{
    private userServices : UserServices;

    constructor(service : UserServices)
    {
        this.userServices = service;
    }

    public findAllUsers(req: Request, res: Response)
    {
        const result = this.userServices.getAllUsers();
    }

    public async findMyUser(req: AuthenticatedUserRequest, res: Response)
    {
        const {userId} = req
        const result = await this.userServices.getMyUser(userId);
        if(result.error === null){
            res.status(200).json(result)
        }
        else{res.status(result.status).json({message: result.error});}
    }

    public findUser(req: Request, res: Response)
    {

    }

    public async createUser(req: Request, res: Response)
    {
        const userData : UserData = req.body;
        const userId : string = uuid();
        const result = await this.userServices.create(userId, userData);

        if (result.error === null) {
            console.log(result.userType);
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

    public updateUser(req: Request, res: Response)
    {

    }

    public deleteUser(req: Request, res: Response)
    {

    }
}