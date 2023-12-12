import { Request, Response } from 'express';
import TicketRepository from '../repositories/ticketRepository';
import { ITicket, Ticket } from '../models/Ticket';
import TrainRepository from '../repositories/trainRepository';
import {Train} from '../models/Train';

const ticketRepository = new TicketRepository(Ticket);
const trainRepository = new TrainRepository(Train);

export const getAllTrains = async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name as string;
  const time_of_departure = req.query.time_of_departure as string;
  const start_station = req.query.start_station as string;
  const end_station = req.query.end_station as string;
  const limit = parseInt(req.query.limit as string, 10);
  try {
    const trains = await ticketRepository.getAllTrains(name,time_of_departure,start_station,end_station,limit);
    if (!trains) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(trains);
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