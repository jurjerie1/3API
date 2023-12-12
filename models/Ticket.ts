import mongoose, { Schema, Document, Types } from "mongoose";
import { NewTicket } from "./ITicket";

export interface ITicket extends NewTicket, Document {}

const StationSchema: Schema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    train:{
        type: Schema.Types.ObjectId,
        ref: "Train",
    },
    number_of_place: { 
        type: Number,
        default: 1,
    },
});
const Ticket = mongoose.model<ITicket>("Ticket", StationSchema);

export { Ticket };
