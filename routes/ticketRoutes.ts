import {Router} from "express";
import { auth, admin } from "../middlewares/authentification";
import { validateGet, validatePost, schemas } from "../middlewares/validationMiddleware";
import { addReservation, getAllTicketByTrain, getTicketById, verifyTicketById } from "../controlers/ticketController";

const ticketRoutes = Router();

// ticketRoutes.get('/',  , getAllTrains);
ticketRoutes.get('/train/:id', auth, getAllTicketByTrain);
ticketRoutes.get('/:id', auth, getTicketById);
ticketRoutes.get('/verify/:id', auth, admin, verifyTicketById);
ticketRoutes.post('/', auth, validatePost(schemas.addReservation), auth, addReservation);
// ticketRoutes.delete('/:id', auth, admin, deleteTrain);
// ticketRoutes.put('/:id', auth, admin, updateTrain);











export default ticketRoutes;