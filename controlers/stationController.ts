import {Request, Response} from "express";
import {IStation, Station} from "../models/Station";
import StationRepository from "../repositories/stationRepository";


const stationRepository = new StationRepository(Station);

export const createStation = async (req: Request, res: Response): Promise<void> => {
    const station: IStation = req.body;
    try {
        const newTrain = await stationRepository.createStation(station);
        res.json(newTrain);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};