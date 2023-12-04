// trainRepository.ts
import { Model, Document } from 'mongoose';
import { ITrain } from '../models/Train';

class TrainRepository {
    private model: Model<Document & ITrain>;

    constructor(model: Model<Document & ITrain>) {
        this.model = model;
    }

    getAllTrains(name:string = "", time_of_departure:string ="", start_station:string = "", end_station:string =""): Promise<ITrain[]> {
        console.log(name, time_of_departure);
        const query: Record<string, any> = {};

        if (name !== "") {
            query.name = name;
        }
        if (time_of_departure !== "") {
            query.time_of_departure = time_of_departure;
        }

        if (start_station !== "") {
            query.start_station = start_station;
        }

        if (end_station !== "") {
            query.end_station = end_station;
        }

        return this.model.find(query).exec();
    }

    getTrainById(id: string): Promise<ITrain | null> {
        return this.model.findById(id).exec();
    }

    createTrain(train: ITrain): Promise<ITrain> {
        return this.model.create(train);
    }

    deleteTrain(id: string): Promise<ITrain | null> {
        return this.model.findByIdAndDelete(id).lean().exec();
    }

    updateTrain(id: string, train: ITrain): Promise<ITrain | null> {
        return this.model.findByIdAndUpdate(id, train, { new: true }).lean().exec();
    }
}

export default TrainRepository;
