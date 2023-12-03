import mongoose, { Schema, Document, Types } from "mongoose";
import {NewTrain, Train} from "./ITrain";
import { Station } from "./Station";

export interface ITrain extends NewTrain, Document {}

type TrainDocument = Document & Train;

const TrainSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (value: string) => {
                return value.length > 3;
            },
            message: 'Name must be at least 4 characters long.'
        },
        required: [true, 'Name is required.']

    },
    start_station: {
        type: Schema.Types.ObjectId,
        ref: "Station",
        validate: {
            validator: function (value: Types.ObjectId) {
                return Station.exists({_id: value});
            },
            message: 'Invalid start station.'
        },
        required: [true, 'Start station is required.']
    },
    end_station: {
        type: Schema.Types.ObjectId,
        ref: "Station",
        validate: {
            validator: function (value: Types.ObjectId) {
                return Station.exists({_id: value});
            },
            message: 'Invalid end station.'
        },
        required: [true, 'End station is required.']

    },
    time_of_departure: {
        type: Date,
        validate: {
            validator: function (value: Date) {
                // return value >= new Date("hh:mm");
                return true;
            },
            message: 'Departure time must be in the future.'
        },
        required: [true, 'Departure time is required.']
    },
});

const Train = mongoose.model<ITrain>("Train", TrainSchema);


export { Train };
