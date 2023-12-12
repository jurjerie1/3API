// trainRepository.ts
import { Model, Document } from 'mongoose';
import { ITicket } from '../models/Ticket';

class TicketRepository {
    private model: Model<Document & ITicket>;

    constructor(model: Model<Document & ITicket>) {
        this.model = model;
    }

    getAllTrains(name:string = "", time_of_departure:string ="", start_station:string = "", end_station:string ="", limit:number = 10): Promise<ITicket[]> {
        console.log(name, time_of_departure);
        const query: Record<string, any> = {};

        if (name !== "") {
            query.name = name;
        }
        if (time_of_departure !== "") {
            query.time_of_departure = time_of_departure;
        }

        if (start_station !== "") {
            query.start_station = start_station;
        }

        if (end_station !== "") {
            query.end_station = end_station;
        }

        return this.model.find(query).limit(limit).exec();
    }

    addReservation(ticket : ITicket) {
        return this.model.create(ticket);
    }

    getTicketByTrain(id : String) {
        return this.model.find({ train_id: id });
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
}

export default TicketRepository;