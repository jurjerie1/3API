import { Request, Response } from 'express';
import TrainRepository from '../repositories/trainRepository';
import { Train, ITrain } from '../models/Train';

const trainRepository = new TrainRepository(Train);

export const getAllTrains = async (req: Request, res: Response): Promise<void> => {
  try {
    const trains = await trainRepository.getAllTrains();
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
    res.json(newTrain);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
  }
};
