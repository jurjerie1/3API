import {Router} from "express";
import { auth, admin } from "../middlewares/authentification";
import { validateGet, validatePost, schemas } from "../middlewares/validationMiddleware";
import { getAllTrains, addReservation } from "../controlers/ticketController";

const ticketRoutes = Router();

// ticketRoutes.get('/',  , getAllTrains);
// ticketRoutes.get('/:id', getTrainById);
ticketRoutes.post('/',validatePost(schemas.addReservation), auth, addReservation);
// ticketRoutes.delete('/:id', auth, admin, deleteTrain);
// ticketRoutes.put('/:id', auth, admin, updateTrain);











export default ticketRoutes;