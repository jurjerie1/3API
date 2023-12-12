// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';
import { connectDB } from './utils/connectDB';
import 'dotenv/config';
import trainRoutes from "./routes/trainRoutes";
import stationRoutes from "./routes/stationRoutes";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from './routes/ticketRoutes';
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(5000, () => console.log("server on port 5000"));
