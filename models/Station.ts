import mongoose from "mongoose";
import type { Document, Schema } from "mongoose";
import type { NewStation } from "./IStation";

export interface IStation extends NewStation, Document {}

const StationSchema: Schema = new mongoose.Schema({
    name: String, 
    open_hour: String, 
    close_hour: String, 
    image: String,
});
const Station = mongoose.model<IStation>("Station", StationSchema);

export { Station };
