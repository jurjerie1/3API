/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

import { Request, Response } from 'express';
import { User, IUser } from '../models/User';
import UserRepository from '../repositories/userRepository';
import { generateToken } from '../utils/tools'
import bcrypt from "bcrypt";

const userRepository = new UserRepository(User);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 username: "User1"
 *                 email: "user1@example.com"
 *                 role: 0
 */

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepository.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to get
 *     responses:
 *       '200':
 *         description: The user details
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               username: "User1"
 *               email: "user1@example.com"
 *               role: 0
 */

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    let id  = req.params.id;
    if (req.body.userData.role > 1 && req.params.id !== undefined) {
        id  = req.params.id;
    }else{
        id  = req.body.userData.userId;
    }
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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "UpdatedUser"
 *             email: "updateduser@example.com"
 *             role: 1
 *     responses:
 *       '200':
 *         description: Successfully updated the user
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               username: "UpdatedUser"
 *               email: "updateduser@example.com"
 *               role: 1
 */

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const user : IUser = req.body;
    let id: string; // Correction : Utilisez "string" au lieu de "String" pour déclarer une chaîne de caractères.

    if (req.body.userData.role > 1 && req.params.id !== undefined) {
        id = req.params.id;
    } else {
        id = req.body.userData.userId;
    }

    try {
        console.log('User ID to update:', id); // Ajoutez cette ligne pour afficher l'ID de l'utilisateur à mettre à jour.
        const updatedUser = await userRepository.updateUser(id, user);
        console.log('Updated User:', updatedUser); // Ajoutez cette ligne pour afficher l'utilisateur mis à jour.

        if (!updatedUser) {
            console.log('User not found'); // Ajoutez cette ligne pour indiquer que l'utilisateur n'a pas été trouvé.
            res.status(404).json({ error: 'User not found' });
            return;
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error:', error); // Ajoutez cette ligne pour afficher des informations sur l'erreur.
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the user
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               username: "DeletedUser"
 *               email: "deleteduser@example.com"
 *               role: 0
 */

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    let id = req.body.userData.userId;
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

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: "admin@admin.com"
 *             password: "admin@admin.com"
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: "1"
 *                 email: "user@example.com"
 *                 pseudo: "User1"
 *                 password: ""
 *                 role: 0
 *                 __v: 0
 *               token: "tokenString"
 */

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

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: "NewUser"
 *             email: "newuser@example.com"
 *             password: "password"
 *     responses:
 *       '201':
 *         description: Successfully registered a new user
 *         content:
 *           application/json:
 *             example:
 *               newUser:
 *                 id: "2"
 *                 username: "NewUser"
 *                 email: "newuser@example.com"
 *                 role: 0
 *               token: "tokenString"
 */
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