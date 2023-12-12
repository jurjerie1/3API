import {Router} from "express";
import {createStation, deleteStation, getAllStations, updateStation} from "../controlers/stationController";
import { admin, auth, employe } from "../middlewares/authentification";
import multer from "multer";

const upload = multer({ dest: '../public/uploads' })

const stationRoutes = Router();

stationRoutes.get('/', getAllStations);
stationRoutes.put("/:id", auth, admin, updateStation)
stationRoutes.delete("/:id"/*, upload.single('image')*/, auth, admin, deleteStation)
stationRoutes.post('/', auth, admin, createStation);


export default stationRoutes;