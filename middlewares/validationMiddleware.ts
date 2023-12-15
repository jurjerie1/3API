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
    train: Joi.string().required(),
    number_of_place: Joi.number().default(1),
  }),
  register: Joi.object({
    email: Joi.string().email().required(),
    pseudo: Joi.string().required(),
    password: Joi.string().required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updateUser: Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string(),
  }),

  createTrain: Joi.object({
    name: Joi.string().required(),
    start_station: Joi.string().required(),
    end_station: Joi.string().required(),
    time_of_departure: Joi.date().required(),
    time_of_arrived: Joi.date().required(),
    number_of_places: Joi.number().default(1),
  }),

  updateTrain: Joi.object({
    name: Joi.string().required(),
    start_station: Joi.string().required(),
    end_station: Joi.string().required(),
    time_of_departure: Joi.date().required(),
    time_of_arrived: Joi.date().required(),
    number_of_places: Joi.number().default(1),
  }),

  createStation: Joi.object({
    name: Joi.string().required(),
    openingTime: Joi.string().required(),
    closingTime: Joi.string().required(),
    image: Joi.binary(),
  }),

  updateStation: Joi.object({
    name: Joi.string(),
    openingTime: Joi.string(),
    closingTime: Joi.string(),
    image: Joi.string(),
  }),
};