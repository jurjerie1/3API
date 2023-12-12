import {Request, Response} from "express";
import {IStation, Station} from "../models/Station";
import StationRepository from "../repositories/stationRepository";


const stationRepository = new StationRepository(Station);
const trainRepository = new StationRepository(Station);

export const createStation = async (req: Request, res: Response): Promise<void> => {
    const station: IStation = req.body;
    try {
        const newTrain = await stationRepository.createStation(station);
        res.json(newTrain);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

export const getAllStations = async (req: Request, res: Response): Promise<void> => {
    const name: String = req.query.name as string;
    try {
        const trains = await stationRepository.getAllStation(name);
        res.json(trains);
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

export const updateStation = async (req : Request, res: Response): Promise<void> => {
    const id: String = req.params.id as String;
    console.log(id)
    const station: IStation = req.body;
    try {
        const updateStation = await stationRepository.updateStation(id, station);
        res.json(updateStation);
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
}

export const deleteStation = async (req : Request, res : Response): Promise<void> => {
    const id : string = req.params.id;
    try{
        const deleteTrainfromStation = await trainRepository.deleteStation(id);
        const deleteStation = await stationRepository.deleteStation(id);
        res.json(deleteStation)
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
}