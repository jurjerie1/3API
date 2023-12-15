import { Model, Document } from 'mongoose';
import { IStation } from '../models/Station';
import TrainRepository from './trainRepository';
import { Train } from '../models/Train';

const trainRepository = new TrainRepository(Train);

class StationRepository {
    private model: Model<Document & IStation>;

    constructor(model: Model<Document & IStation>) {
        this.model = model;
    }

    getAllStation(name: String): Promise<IStation[]> {
        const query: Record<string, any> = {};

        if (name && name !== "") {
            query.name = name;
        }
        return this.model.find(query);
    }

    async createStation(station: IStation): Promise<IStation> {
        try {
            const newStation = await this.model.create(station);
            return newStation;
        } catch (error) {
            throw error;
        }
    }
    


    updateStation(id: String, station: IStation): Promise<IStation | null>{
        return this.model.findByIdAndUpdate(id, station)
    }

    async deleteStation(id: string): Promise<IStation | null> {
        try {
            const stationToDelete = await this.model.findById(id).lean();

            await trainRepository.deleteTrainsByStationId(id);

            return await this.model.findByIdAndDelete(id).lean();
        } catch (error) {
            throw error;
        }
    }
}


export default StationRepository