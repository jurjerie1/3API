/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Operations related to stations
 */

import {Request, Response} from "express";
import {IStation, Station} from "../models/Station";
import StationRepository from "../repositories/stationRepository";
import sharp from 'sharp';

const stationRepository = new StationRepository(Station);
const trainRepository = new StationRepository(Station);

/**
 * @swagger
 * /api/stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "New Station"
 *             open_hour: "08:00"
 *             close_hour: "20:00"
 *             image: "path/to/image.jpg"
 *     responses:
 *       '201':
 *         description: Successfully created a new station
 *         content:
 *           application/json:
 *             example:
 *               id: "2"
 *               name: "New Station"
 *               open_hour: "08:00"
 *               close_hour: "20:00"
 *               image: "path/to/image.jpg"
 */

export const createStation = async (req: Request, res: Response): Promise<void> => {
    try {
        const station: IStation = req.body;
        const image: Express.Multer.File | undefined = req.file;

        // Vérifier si une image a été téléchargée
        if (!image) {
            res.status(400).json({ error: 'Image is required.' });
            return;
        }

        // Vérifier que l'upload est une image
        if (!image.mimetype.startsWith('image/')) {
            res.status(400).json({ error: 'Le fichier uploadé n\'est pas une image.' });
            return;
        }

        // Lire les dimensions de l'image
        const dimensions = await sharp(image.path).metadata();

        // Vérifier que l'image a des dimensions de 200x200 pixels
        if (dimensions.width !== 200 || dimensions.height !== 200) {
            // Redimensionner l'image
            await sharp(image.path)
                .resize(200, 200)
                .toFile(`public/uploads/${image.filename}.jpg`); // Spécifiez le chemin où vous souhaitez sauvegarder l'image redimensionnée

            // Mettre à jour le chemin de l'image dans la base de données
            station.image = `public/uploads/${image.filename}.jpg`;
        } else {
            // L'image est déjà de la bonne taille, utiliser le chemin existant
            station.image = image.filename;
        }

        // Créer la station avec l'image
        const newStation = await stationRepository.createStation(station);

        res.status(201).json(newStation);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/stations:
 *   get:
 *     summary: Get all stations
 *     tags: [Stations]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Name of the station to filter by
 *     responses:
 *       '200':
 *         description: A list of stations
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "Station 1"
 *                 open_hour: "08:00"
 *                 close_hour: "20:00"
 *                 image: "public/uploads/image.jpg"
 */

export const getAllStations = async (req: Request, res: Response): Promise<void> => {
    const name: String = req.query.name as string;
    try {
        const trains = await stationRepository.getAllStation(name);
        res.json(trains);
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /api/stations/{id}:
 *   put:
 *     summary: Update a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Station"
 *             open_hour: "09:00"
 *             close_hour: "21:00"
 *             image: "path/to/updated_image.jpg"
 *     responses:
 *       '200':
 *         description: Successfully updated the station
 *         content:
 *           application/json:
 *             example:
 *               id: "2"
 *               name: "Updated Station"
 *               open_hour: "09:00"
 *               close_hour: "21:00"
 *               image: "path/to/updated_image.jpg"
 */

export const updateStation = async (req : Request, res: Response): Promise<void> => {
    const id: String = req.params.id as String;
    console.log(id)
    const station: IStation = req.body;
    try {
        const updateStation = await stationRepository.updateStation(id, station);
        res.json(updateStation);
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
}

/**
 * @swagger
 * /api/stations/{id}:
 *   delete:
 *     summary: Delete a station by ID
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the station to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted the station
 *         content:
 *           application/json:
 *             example:
 *               id: "2"
 *               name: "Deleted Station"
 *               open_hour: "08:00"
 *               close_hour: "20:00"
 *               image: "path/to/deleted_image.jpg"
 */

export const deleteStation = async (req : Request, res : Response): Promise<void> => {
    const id : string = req.params.id;
    try{
        const deleteTrainfromStation = await trainRepository.deleteStation(id);
        const deleteStation = await stationRepository.deleteStation(id);
        res.json(deleteStation)
    }
    catch (error){
        res.status(500).json({ error: error instanceof Error ? error.message : 'Internal Server Error' });
    }
}