import {Router} from "express";
import {createStation, deleteStation, getAllStations, updateStation} from "../controlers/stationController";

const stationRoutes = Router();

stationRoutes.get('/', getAllStations);
stationRoutes.put("/:id", updateStation)
stationRoutes.delete("/:id",deleteStation)
stationRoutes.post('/', createStation);


export default stationRoutes;