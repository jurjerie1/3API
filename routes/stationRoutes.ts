// routes/trainRoutes.js
import {Router} from "express";
import {createStation} from "../controlers/stationController";

const stationRoutes = Router();

// stationRoutes.get('/', getAllStations);
// stationRoutes.get('/:id', getTrainById);
stationRoutes.post('/', createStation);
export default stationRoutes;
