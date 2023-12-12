import { Request, Response } from 'express';
import TicketRepository from '../repositories/ticketRepository';
import { ITicket, Ticket } from '../models/Ticket';
import TrainRepository from '../repositories/trainRepository';
import {Train} from '../models/Train';

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

export const addReservation = async (req: Request, res: Response): Promise<void> => {
  const reservation: ITicket = req.body;
  reservation.user_id = req.body.userData.userId;
  try {
    if ((await trainRepository.getNumberOfPlace(reservation.train_id) - await ticketRepository.getNumberOfReservation(reservation.train_id)) < (reservation.number_of_place !== 0 ? reservation.number_of_place as number : 0))
    {
      const availableSeats = await trainRepository.getNumberOfPlace(reservation.train_id) - await ticketRepository.getNumberOfReservation(reservation.train_id);
      res.status(404).json({ error: 'Reservation is not possible, this train does not have ' + availableSeats.toString() + ' available' });
      return;
    }
    console.log(await trainRepository.getNumberOfPlace(reservation.train_id) - await ticketRepository.getNumberOfReservation(reservation.train_id))
    const newTrain = await ticketRepository.addReservation(reservation);
    if (!newTrain) {
      res.status(404).json({ error: 'Reservation is not possible' });
      return;
    }
    res.json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error? error.message : 'Internal Server Error' });
  }
}

export const getTicketById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const ticket = await ticketRepository.getTicketById(id);
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
  let valid = false;
  try {
    const ticket = await ticketRepository.getTicketById(id);
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }
    valid = await ticketRepository.verifyTicketById(ticket);
    res.json({ticket, isValid: valid});
  } catch (error) {
    res.status(500).json({ error: error instanceof Error? error.message : 'Internal Server Error' });
  }
}
