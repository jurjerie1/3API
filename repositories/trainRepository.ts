// trainRepository.ts
import { Model, Document } from 'mongoose';
import { ITrain } from '../models/Train';
import { deleteStation } from '../controlers/stationController';

class TrainRepository {
    private model: Model<Document & ITrain>;

    constructor(model: Model<Document & ITrain>) {
        this.model = model;
    }

    getAllTrains(name:string = "", time_of_departure:string ="", start_station:string = "", end_station:string ="", limit:number = 10): Promise<ITrain[]> {
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

        return this.model.find(query).limit(limit).exec();
    }

    getTrainById(id: string): Promise<ITrain | null> {
        return this.model.findById(id).exec();
    }

    createTrain(train: ITrain): Promise<ITrain> {
        console.log(train);
        return this.model.create(train);
    }

    deleteTrain(id: string): Promise<ITrain | null> {
        return this.model.findByIdAndDelete(id).lean().exec();
    }

    updateTrain(id: string, train: ITrain): Promise<ITrain | null> {
        return this.model.findByIdAndUpdate(id, train, { new: true }).lean().exec();
    }

    async deleteTrainsByStationId(stationId: string): Promise<void> {
        try {
            await this.model.deleteMany({
                $or: [{ start_station: stationId }, { end_station: stationId }],
            }).lean();
        } catch (error) {
            throw error;
        }
    }

    async getNumberOfPlace(id: string): Promise<number> {
        const train: ITrain | null = await this.model.findOne({ _id: id });
        const number_of_places: number | undefined = train?.number_of_places as number;
        if (number_of_places !== undefined) {
            console.log("nb place == > " + number_of_places )
            return number_of_places as number;
        } else {
            return 0;
        }
    }
  
}

export default TrainRepository;