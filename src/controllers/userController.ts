import { Request, Response } from 'express';

import { UserServices } from '../services/users';

export class UserController
{
    private userServices : UserServices;

    constructor()
    {
        this.userServices = new UserServices();
    }

    public findAllUsers(req: Request, res: Response)
    {
        const result = this.userServices.getAllUsers();
    }

    public findMyUser(req: Request, res: Response)
    {

    }

    public findUser(req: Request, res: Response)
    {

    }

    public createUser(req: Request, res: Response)
    {

    }

    public updateUser(req: Request, res: Response)
    {

    }

    public deleteUser(req: Request, res: Response)
    {

    }
}