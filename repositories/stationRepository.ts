// trainRepository.ts
import { Model, Document } from 'mongoose';
import { IStation } from '../models/Station';

class StationRepository {
    private model: Model<Document & IStation>;

    constructor(model: Model<Document & IStation>) {
        this.model = model;
    }

    getAllStation(): Promise<IStation[]> {
        return this.model.find().exec();
    }

    getStationById(id: string): Promise<IStation | null> {
        return this.model.findById(id).exec();
    }

    createStation(station: IStation): Promise<IStation> {
        return this.model.create(station);
    }
}

export default StationRepository;

