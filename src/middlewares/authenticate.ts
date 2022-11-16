import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

function authenticate(req : Request, res : Response, next : NextFunction)
{
    const token = req.cookies;
    if (!token)
    {
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
    };
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded)
    {
      if (err)
      {
        return res.status(401).json({ message: 'Para prosseguir, faça login novamente.' });
      };

      req.userID = decoded.userID;
      req.userType = decoded.userType;
      req.userName = decoded.userName;
      req.userEmail = decoded.userEmail;
      req.userCoins = decoded.userCoins;
      req.image = decoded.image;
      next();
    });
};

export default authenticate;