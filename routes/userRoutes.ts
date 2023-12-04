import { Router } from "express";
import { getAllUser, getUserById, login, register } from "../controlers/userController";

const userRoutes = Router();

userRoutes.get('/', getAllUser);
userRoutes.get('/:id', getUserById);
userRoutes.post("/login", login)
userRoutes.post("/register", register)



export default userRoutes;