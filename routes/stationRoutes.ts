import {Router} from "express";
import {createStation, deleteStation, getAllStations, updateStation} from "../controlers/stationController";
import { admin, auth, employe } from "../middlewares/authentification";

const stationRoutes = Router();

stationRoutes.get('/', auth, admin, getAllStations);
stationRoutes.put("/:id", updateStation)
stationRoutes.delete("/:id",deleteStation)
stationRoutes.post('/', createStation);


export default stationRoutes;