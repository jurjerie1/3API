import { Request, Response } from 'express';
import TrainRepository from '../repositories/trainRepository';
import { User, IUser } from '../models/User';
import UserRepository from '../repositories/userRepository';
import { generateToken } from '../utils/tools'
import bcrypt from "bcrypt";

const userRepository = new UserRepository(User);

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await userRepository.getUserById(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};



// Suppresion de train
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
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
};