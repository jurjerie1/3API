import { Request, Response } from 'express';
import TicketRepository from '../repositories/ticketRepository';
import { ITicket, Ticket } from '../models/Ticket';
import TrainRepository from '../repositories/trainRepository';
import {CustomRequest} from "../utils/CustomRequest";
import { Train } from '../models/Train';
const ticketRepository = new TicketRepository(Ticket);
const trainRepository = new TrainRepository(Train);



export const getAllTicketByTrain = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const tickets = await ticketRepository.getTicketByTrain(id);
    if (!tickets) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};


export const getAllTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await ticketRepository.getAllTciket();
    if (!tickets) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    console.log(tickets)
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

export const addReservation = async (req: CustomRequest, res: Response): Promise<void> => {
  const reservation: ITicket = req.body;
  if (req.userData && req.userData.userId) {
    reservation.user = req.userData.userId.toString();
    try {
      if (
          (await trainRepository.getNumberOfPlace(reservation.train) -
              (await ticketRepository.getNumberOfReservation(reservation.train))) <
          (reservation.number_of_place !== 0 ? (reservation.number_of_place as number) : 0)
      ) {
        const availableSeats =
            (await trainRepository.getNumberOfPlace(reservation.train)) -
            (await ticketRepository.getNumberOfReservation(reservation.train));
        res
            .status(404)
            .json({
              error: 'Reservation is not possible, this train does not have ' + availableSeats.toString() + ' available',
            });
        return;
      }
      const newResa = await ticketRepository.addReservation(reservation);
      if (!newResa) {
        res.status(404).json({ error: 'Reservation is not possible' });
        return;
      }
      res.json(newResa);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
  } else {
    res.status(401).json({ message: 'User data is undefined' });
  }
};

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const ticket = await ticketRepository.getTicketById(id); // Référence au rôle non présente ici
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error? error.message : 'Internal Server Error' });
  }
}



export const verifyTicketById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  let valid = false as boolean;
  try {
    const ticket = await ticketRepository.getTicketById(id); // Référence au rôle non présente ici
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    valid = await verifyTicket(ticket);
    res.json({ticket, isValid: valid});
  } catch (error) {
    res.status(500).json({ error: error instanceof Error? error.message : 'Internal Server Error' });
  }
}

export const verifyTicket = async (ticket: ITicket): Promise<boolean> => {
  const train = await trainRepository.getTrainById(ticket.train);
  if (!train) {
    return false;
  }
  const departureDate = new Date(train.time_of_departure).getTime();
  const arrivalDate = new Date(train.time_of_arrived).getTime();
  const currentDate = Date.now();

  if (departureDate <= currentDate && arrivalDate >= currentDate) {
    return true;
  } else {
    return false;
  }
}

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const id = req.query.id as string;
  try {
    const train = await ticketRepository.deleteTicket(id); // Référence au rôle non présente ici
    if (!train) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}
