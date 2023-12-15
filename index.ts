import express from 'express';
import cors from 'cors';
import { connectDB } from './utils/connectDB';
import 'dotenv/config';
import trainRoutes from "./routes/trainRoutes";
import stationRoutes from "./routes/stationRoutes";
import userRoutes from "./routes/userRoutes";
import ticketRoutes from './routes/ticketRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swaggerOptions'; // Importez le fichier de configuration
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public", express.static('./public/'));

// Ajoutez cette partie pour Swagger
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

app.listen(5000, () => console.log("Serveur sur le port 5000"));
