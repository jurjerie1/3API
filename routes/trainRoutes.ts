import {Router} from "express";
import {createTrain, getAllTrains, getTrainById, deleteTrain, updateTrain} from "../controlers/trainController";
import { auth, admin } from "../middlewares/authentification";
import { validateGet, validatePost, schemas } from "../middlewares/validationMiddleware";
const trainRoutes = Router();

trainRoutes.get('/', getAllTrains);
trainRoutes.get('/:id', getTrainById);
trainRoutes.post('/', validatePost(schemas.createTrain), auth, admin, createTrain);
trainRoutes.delete('/:id', auth, admin, deleteTrain);
trainRoutes.put('/:id', validatePost(schemas.updateTrain), auth, admin, updateTrain);












export default trainRoutes;