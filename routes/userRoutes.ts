import { Router } from "express";
import { deleteUser, getAllUser, getUserById, login, register, updateUser } from "../controlers/userController";
import { admin, auth } from "../middlewares/authentification";
import { validatePost, schemas } from "../middlewares/validationMiddleware";

const userRoutes = Router();

userRoutes.get('/', auth, admin, getAllUser);
userRoutes.get('/user/:id?', auth, getUserById);
userRoutes.post("/login", validatePost(schemas.login), login)
userRoutes.post("/register", validatePost(schemas.register), register);
userRoutes.put("/", auth, updateUser);
userRoutes.delete("/", auth, deleteUser);


export default userRoutes;