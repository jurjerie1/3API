import { Types } from "mongoose";


export interface NewTrain {
    name: String, 
    start_station: Types.ObjectId | string | null;
    end_station: Types.ObjectId | string | null;
    time_of_departure: Date, 
    number_of_places: Number,
}

export interface Train extends NewTrain {
    _id: string
}