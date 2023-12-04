// trainRepository.ts
import { Model, Document } from 'mongoose';
import { IStation } from '../models/Station';

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
        // Use Mongoose's find method with the constructed query
        return this.model.find(query);
    }

    createStation(station: IStation): Promise<IStation> {
        return this.model.create(station);
    }


    updateStation(id: String, station: IStation): Promise<IStation | null>{
        return this.model.findByIdAndUpdate(id, station)
    }

    deleteStation(id: String): Promise<IStation | null>{
        return this.model.findByIdAndDelete(id).lean();
    }
}


export default StationRepository