import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/connectDB';
import 'dotenv/config';
import trainRoutes from "./routes/trainRoutes";
import stationRoutes from "./routes/stationRoutes";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from './routes/ticketRoutes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static('./public/'));

const specs = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(5000, () => console.log("Serveur sur le port 5000"));
