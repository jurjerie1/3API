/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Operations related to tickets
 */

import { Request, Response } from 'express';
import TicketRepository from '../repositories/ticketRepository';
import { ITicket, Ticket } from '../models/Ticket';
import TrainRepository from '../repositories/trainRepository';
import {Train} from '../models/Train';

const ticketRepository = new TicketRepository(Ticket);
const trainRepository = new TrainRepository(Train);

/**
 * @swagger
 * /api/tickets/train/{id}:
 *   get:
 *     summary: Get all tickets for a specific train
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the train
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */

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

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Tickets]
 *     responses:
 *       '200':
 *         description: Successful response
 */

export const getAllTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await ticketRepository.getAllTciket();
    if (!tickets) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
}

/**
 * @swagger
 * /api/tickets/reservation:
 *   post:
 *     summary: Add a reservation
 *     tags: [Tickets]
 *     requestBody:
 *       description: Ticket details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: Reservation is not possible
 */

export const addReservation = async (req: Request, res: Response): Promise<void> => {
  const reservation: ITicket = req.body;
  reservation.user = req.body.userData.userId;
  try {
    if ((await trainRepository.getNumberOfPlace(reservation.train) - await ticketRepository.getNumberOfReservation(reservation.train)) < (reservation.number_of_place !== 0 ? reservation.number_of_place as number : 0))
    {
      const availableSeats = await trainRepository.getNumberOfPlace(reservation.train) - await ticketRepository.getNumberOfReservation(reservation.train);
      res.status(404).json({ error: 'Reservation is not possible, this train does not have ' + availableSeats.toString() + ' available' });
      return;
    }
    console.log(await trainRepository.getNumberOfPlace(reservation.train) - await ticketRepository.getNumberOfReservation(reservation.train))
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


/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */

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

/**
 * @swagger
 * /api/tickets/verify/{id}:
 *   get:
 *     summary: Verify a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */

export const verifyTicketById = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  let valid = false as boolean;
  try {
    const ticket = await ticketRepository.getTicketById(id);
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

/**
 * @swagger
 * /api/tickets:
 *   delete:
 *     summary: Delete a ticket by ID
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the ticket
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: User not found
 */

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  const id = req.query.id as string;
    try {
        const train = await ticketRepository.deleteTicket(id);
        if (!train) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(train);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
}
