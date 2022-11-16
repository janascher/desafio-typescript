import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export interface decodeData {
  userId : string,
  userName : string,
  userEmail : string,
  userType : string
}

function authenticate(req : Request, res : Response, next : NextFunction)
{
    const token = req.cookies;
    if (!token)
    {
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    };
    
    if (process.env.JWT_SECRET){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as decodeData;  
            (req as any).userId = decoded.userId;
            (req as any).userType = decoded.userType;
            (req as any).userName = decoded.userName;
            (req as any).userEmail = decoded.userEmail;
            next();
        }
        catch (err : any) {
            return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
        }
    } else {  
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    }  
};

export default authenticate;