// routes/trainRoutes.js
import {Router} from "express";
import {createTrain, getAllTrains, getTrainById} from "../controlers/trainController";

const trainRoutes = Router();

trainRoutes.get('/', getAllTrains);
trainRoutes.get('/:id', getTrainById);
trainRoutes.post('/', createTrain);
export default trainRoutes;
