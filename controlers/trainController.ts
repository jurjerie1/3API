/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: Operations related to trains
 */

import { Request, Response } from 'express';
import TrainRepository from '../repositories/trainRepository';
import { Train, ITrain } from '../models/Train';

const trainRepository = new TrainRepository(Train);

/**
 * @swagger
 * /api/trains:
 *   get:
 *     summary: Get all trains
 *     tags: [Trains]
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Name of the train
 *         schema:
 *           type: string
 *       - name: time_of_departure
 *         in: query
 *         description: Time of departure
 *         schema:
 *           type: string
 *       - name: start_station
 *         in: query
 *         description: Start station
 *         schema:
 *           type: string
 *       - name: end_station
 *         in: query
 *         description: End station
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: Limit of results
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved trains
 *         content:
 *           application/json:
 *             example: [{"name": "Train1", "time_of_departure": "2023-12-01T08:00:00.000Z", "start_station": "StationA", "end_station": "StationB"}]
 *       404:
 *         description: Trains not found
 * 
 */

export const getAllTrains = async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name as string;
  const time_of_departure = req.query.time_of_departure as string;
  const start_station = req.query.start_station as string;
  const end_station = req.query.end_station as string;
  const limit = parseInt(req.query.limit as string, 10);
  try {
    const trains = await trainRepository.getAllTrains(name,time_of_departure,start_station,end_station,limit);
    if (!trains) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/trains/{id}:
 *   get:
 *     summary: Get train by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the train
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved train
 *         content:
 *           application/json:
 *             example: {"name": "Train1", "time_of_departure": "2023-12-01T08:00:00.000Z", "start_station": "StationA", "end_station": "StationB"}
 *       404:
 *         description: Train not found
 * 
 */

export const getTrainById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const train = await trainRepository.getTrainById(id);
    if (!train) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/trains:
 *   post:
 *     summary: Create a new train
 *     tags: [Trains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"name": "Train1", "time_of_departure": "2023-12-01T08:00:00.000Z", "start_station": "StationA", "end_station": "StationB"}
 *     responses:
 *       201:
 *         description: Successfully created train
 *         content:
 *           application/json:
 *             example: {"name": "Train1", "time_of_departure": "2023-12-01T08:00:00.000Z", "start_station": "StationA", "end_station": "StationB"}
 *       500:
 *         description: Internal Server Error
 * 
 */

export const createTrain = async (req: Request, res: Response): Promise<void> => {
  
  const train: ITrain = req.body;
  try {
    const newTrain = await trainRepository.createTrain(train);
    res.json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

/**
 * @swagger
 * /api/trains/{id}:
 *   delete:
 *     summary: Delete train by ID
 *     tags: [Trains]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the train
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted train
 *         content:
 *           application/json:
 *             example: {"name": "Train1", "time_of_departure": "2023-12-01T08:00:00.000Z", "start_station": "StationA", "end_station": "StationB"}
 *       404:
 *         description: Train not found
 *       500:
 *         description: Internal Server Error
 * 
 */

export const deleteTrain = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const train = await trainRepository.deleteTrain(id);
    if (!train) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

// Modification de train
export const updateTrain = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const train: ITrain = req.body;
  try {
    const newTrain = await trainRepository.updateTrain(id, train);
    if (!newTrain) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};


