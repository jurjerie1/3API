import { Types } from "mongoose";


export interface NewTicket {
    user: string;
    train: string;
    number_of_place: Number | 1;
}

export interface Ticket extends NewTicket {
    _id: string
}