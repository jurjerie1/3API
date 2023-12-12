import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema, ValidationResult } from 'joi';

export const validatePost = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: ValidationResult = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateGet = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error }: ValidationResult = schema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message }); 
    }
    next();
  };
};

export const schemas = {
  addReservation: Joi.object({ 
    train_id: Joi.string().required(),
    //user_id: Joi.string(),
    number_of_place: Joi.number()
  }),

  getAllTrain: Joi.object({
    name: Joi.string(),
    time_of_departure: Joi.string(),
    start_station: Joi.string(),
    end_station: Joi.string(),
  }),

  getTrainById: Joi.object({
    id: Joi.number().required(),
  }),

  createUser: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'employee', 'admin').default('user'),
  }),

  updateUser: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string(),
  }),

  createTrain: Joi.object({
    name: Joi.string().required(),
    departureStation: Joi.string().required(),
    arrivalStation: Joi.string().required(),
    departureTime: Joi.string().required(),
    availableSeats: Joi.number().default(50),
  }),

  updateTrain: Joi.object({
    name: Joi.string(),
    departureStation: Joi.string(),
    arrivalStation: Joi.string(),
    departureTime: Joi.string(),
    availableSeats: Joi.number().default(50),
  }),

  createStation: Joi.object({
    name: Joi.string().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    image: Joi.string(),
  }),

  updateStation: Joi.object({
    name: Joi.string(),
    openingTime: Joi.string(),
    closingTime: Joi.string(),
    image: Joi.string(),
  }),

  bookTicket: Joi.object({
    userId: Joi.string().required(),
    trainId: Joi.string().required(),
  }),

  validateTicket: Joi.object({
    bookingId: Joi.string().required(),
  }),
};
