import {Router} from "express";
import {createTrain, getAllTrains, getTrainById, deleteTrain, updateTrain} from "../controlers/trainController";

const trainRoutes = Router();

trainRoutes.get('/', getAllTrains);
trainRoutes.get('/:id', getTrainById);
trainRoutes.post('/', createTrain);
trainRoutes.delete('/:id', deleteTrain);
trainRoutes.put('/:id', updateTrain);


export default trainRoutes;
