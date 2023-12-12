import mongoose, { Schema, Document, Types } from "mongoose";
import {NewTrain, Train} from "./ITrain";
import { Station } from "./Station";

export interface ITrain extends NewTrain, Document {}

type TrainDocument = Document & Train;

const TrainSchema: Schema = new mongoose.Schema({
    name: String,
    start_station: {
        type: Schema.Types.ObjectId,
        ref: "Station",
    },
    end_station: {
        type: Schema.Types.ObjectId,
        ref: "Station",
    },
    time_of_departure: {
        type: Date,
    },
    number_of_places: Number,

});

const Train = mongoose.model<ITrain>("Train", TrainSchema);


export { Train };
