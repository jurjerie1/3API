// trainRepository.ts
import { Model, Document } from 'mongoose';
import { ITicket } from '../models/Ticket';
import { Train } from '../models/ITrain';
import { ITrain } from '../models/Train';

class TicketRepository {
    private model: Model<Document & ITicket>;

    constructor(model: Model<Document & ITicket>) {
        this.model = model;
    }

    getAllTciket(): Promise<ITicket[]> {
        return  this.model.find().exec();
    }

    addReservation(ticket : ITicket) {
        return this.model.create(ticket);
    }

    getTicketByTrain(id : String) {
        return this.model
        .find({ train: id })
        .populate({
            path: "user",
            select: ["pseudo", "email"]
        })
        .populate({
            path: "train",
            select: ["email", "time_of_departure"],
            populate: [
                { path: "start_station" },
                { path: "end_station" }
            ]
        });
    }

    async getNumberOfReservation(id: String): Promise<number> {
        let totalNumberOfPlaces = 0;
        const ticketIds = await this.getTicketByTrain(id);

        for (const ticketId of ticketIds) {
            const ticket = await this.model.findOne({ _id: ticketId }) as ITicket;
            if (ticket) {
            totalNumberOfPlaces += ticket.number_of_place as number;
            }
        }

        return totalNumberOfPlaces;
    }

    async getTicketById(id: String) {
        return this.model.findOne({ _id: id })
        .populate({
            path: "user",
            select: ["pseudo", "email"]
        })
        .populate({
            path: "train",
            select: ["email", "time_of_departure"],
            populate: [
                { path: "start_station" },
                { path: "end_station" }
            ]
        });
    }

    async deleteTicket(id: String) {
        return this.model.deleteOne({ _id: id });
    }
}

export default TicketRepository;