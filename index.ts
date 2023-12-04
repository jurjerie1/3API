// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import { connectDB } from './utils/connectDB';
import 'dotenv/config';
import trainRoutes from "./routes/trainRoutes";
import stationRoutes from "./routes/stationRoutes";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);

app.listen(5000, () => console.log("server on port 5000"));
