

import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import UserRepository from '../repositories/userRepository';
import { generateToken } from '../utils/tools'
import bcrypt from "bcrypt";
import { CustomRequest } from '../utils/CustomRequest';

const userRepository = new UserRepository(User);


export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};


export const getUserById = async (req: CustomRequest, res: Response): Promise<void> => {
    let id: string = req.params.id;

    if (req.userData && req.userData.role !== undefined && req.userData.role > "1" && id !== undefined) {
        id = req.params.id;
    }else{
        id = req.userData?.userId as string;
    }
        try {
            const user = await userRepository.getUserById(id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(user);
            return;
        } catch (error) {
            res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
            return;
        }
};


export const updateUser = async (req: CustomRequest, res: Response): Promise<void> => {
    const user: IUser = req.body;
    let id: string;

    if (req.userData && req.userData.role > "1" && req.params.id !== undefined) {
        id = req.params.id;
    } else if (req.userData && req.userData.userId) {
        id = req.userData.userId;
    } else {
        // Gérez le cas où l'ID de l'utilisateur n'est pas défini.
        res.status(400).json({ error: 'Invalid request' });
        return;
    }

    try {
        const updatedUser = await userRepository.updateUser(id, user);

        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};



export const deleteUser = async (req: CustomRequest, res: Response): Promise<void> => {
    let id = req.userData?.userId as string;
    try {
        const train = await userRepository.deleteUser(id);
        if (!train) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(train);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await userRepository.findUserByEmailAndPassword(email, password);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const token: string = generateToken(user);
        user.password = "";
        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: IUser = req.body;
        const saltRounds = 10;
        user.password = await bcrypt.hash(String(user.password), saltRounds);

        const existingUser = await userRepository.findUserByEmailOrUsername(user.email, user.pseudo);
        if (existingUser) {
            res.status(400).json({ message: 'Email or username already exists' });
            return;
        }
        user.role = 0;
        const newUser: IUser = await userRepository.createUser(user);
        const token: string = generateToken(newUser);
        newUser.password = "";
        res.status(201).json({
            newUser, token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}