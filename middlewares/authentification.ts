// authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { IDecodedToken } from '../models/IDecodedToken';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw new Error('Authorization header missing');
        }

        const token = authorizationHeader.split(' ')[1];
        const decodedToken: IDecodedToken = jwt.verify(token, String(process.env.JWT_KEY)) as IDecodedToken;
        console.log(decodedToken);
        if (!decodedToken || !decodedToken.userId && !decodedToken.role) {
            throw new Error('Invalid token');
        }

        // Attach the decoded user information to the request object
        req.body.userData = decodedToken;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export const employe = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.userData.role > 0){
        next();
        return;
    }
    res.status(401).json({ message: 'Only acces for authorized people' });

}
export const admin = (req: Request, res: Response, next: NextFunction): void => {
    if (req.body.userData.role > 1){
        next();
        return;
    }
    res.status(401).json({ message: 'Only acces for authorized people' });

}