import { Request, Response } from 'express';
import TrainRepository from '../repositories/trainRepository';
import { Train, ITrain } from '../models/Train';

const trainRepository = new TrainRepository(Train);

export const getAllTrains = async (req: Request, res: Response): Promise<void> => {
  const name = req.query.name as string;
  const time_of_departure = req.query.time_of_departure as string;
  const start_station = req.query.start_station as string;
  const end_station = req.query.end_station as string;
  try {
    const trains = await trainRepository.getAllTrains(name,time_of_departure,start_station,end_station);
    if (!trains) {
      res.status(404).json({ error: 'Train not found' });
      return;
    }
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

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

export const createTrain = async (req: Request, res: Response): Promise<void> => {
  const train: ITrain = req.body;
  try {
    const newTrain = await trainRepository.createTrain(train);
    res.status(204);
    res.json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};

// Suppresion de train
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


