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
    // const token = req.cookies;
    // if (!token)
    // {
    //     return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    // };
    
    // if (process.env.JWT_SECRET){
    //   jwt.verify(token, process.env.JWT_SECRET, function(err : any, decoded : decodeData)    
    //   {
    //     if (err)
    //     {
    //       return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    //     };
    //     req.userId = decoded.userId;
    //     req.userType = decoded.userType;
    //     req.userName = decoded.userName;
    //     req.userEmail = decoded.userEmail;
        next();
    //   });
    // } else {  
    //   return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    // }  
};

export default authenticate;