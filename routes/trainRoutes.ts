import {Router} from "express";
import {createTrain, getAllTrains, getTrainById, deleteTrain, updateTrain} from "../controlers/trainController";
import { auth, admin } from "../middlewares/authentification";
import { validateGet, validatePost, schemas } from "../middlewares/validationMiddleware";
const trainRoutes = Router();

trainRoutes.get('/', validateGet(schemas.getAllTrain) , getAllTrains);
trainRoutes.get('/:id', getTrainById);
trainRoutes.post('/', auth, admin, createTrain);
trainRoutes.delete('/:id', auth, admin, deleteTrain);
trainRoutes.put('/:id', auth, admin, updateTrain);












export default trainRoutes;