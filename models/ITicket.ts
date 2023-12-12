import { Types } from "mongoose";


export interface NewTicket {
    user_id: string;
    train_id: string;
    number_of_place: Number | 1;
}

export interface Ticket extends NewTicket {
    _id: string
}