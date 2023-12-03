// trainRepository.ts
import { Model, Document } from 'mongoose';
import { ITrain } from '../models/Train';

class TrainRepository {
    private model: Model<Document & ITrain>;

    constructor(model: Model<Document & ITrain>) {
        this.model = model;
    }

    getAllTrains(): Promise<ITrain[]> {
        return this.model.find().exec();
    }

    getTrainById(id: string): Promise<ITrain | null> {
        return this.model.findById(id).exec();
    }

    createTrain(train: ITrain): Promise<ITrain> {
        return this.model.create(train);
    }
}

export default TrainRepository;
