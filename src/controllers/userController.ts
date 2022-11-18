import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { UserServices } from '../services/users';
import { UserData, AuthenticatedUserDataRequest } from '../models';
import jwt from 'jsonwebtoken';

export class UserController
{
    private userServices : UserServices;

    constructor(service : UserServices)
    {
        this.userServices = service;
    }

    public async findAllUsers(req: Request, res: Response)
    {
        const result = await this.userServices.getAllUsers();
        if(result.error === null){
            res.status(200).json(result)
        }
        else{res.status(result.status).json({message: result.error});}
    }

    public async findMyUser(req: AuthenticatedUserDataRequest, res: Response)
    {
        const {userId} = req
        const result = await this.userServices.getMyUser(userId);
        if(result.error === null){
            res.status(200).json(result)
        }
        else{res.status(result.status).json({message: result.error});}
    }

    public async findUser(req: AuthenticatedUserDataRequest, res: Response)
    {
        const {userId} = req
        const result = await this.userServices.getUserById(userId);
        if(result.error === null){
            res.status(200).json(result)
        }
        else{res.status(result.status).json({message: result.error});}
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

    public async updateUser(req: AuthenticatedUserDataRequest, res: Response)
    {
        const idparam = req.params.user_id;
        const id = req.userId;
        const data : Partial<UserData> = req.body;

        if (idparam !== id) {
            return res.status(401).json({message: 'Usuário não autenticado para atualização!'})
        }
        
        const result = await this.userServices.update({id, data})

        if (result.error === null) {
            res.status(200).json({message: 'Usuário atualizado com sucesso!'})
        } else {
            res.status(result.status).json({message: result.error})
        }
    }

    public async deleteUser(req: AuthenticatedUserDataRequest, res: Response)
    {   
        const admin = req.userType;
        const userId = req.params.user_id  

        if(admin !== true){        
            return res.status(401).json("Não autorizado");
        }

        const result = await this.userServices.removeUser(userId);

        if(result.error === null){
            res.status(200).json(result);
        } else {
            res.status(401).json({message:result.error});
        }        
    }
}