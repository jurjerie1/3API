import mongoose from "mongoose";
import type { Document, Schema } from "mongoose";
import type { NewUser } from "./IUser";

export interface IUser extends NewUser, Document {}

const UserSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, 'Please enter a valid email address'],
    },
    pseudo: {
        type: String,
        unique: true,
    }, 
    password: {
        type: String,
        min: 6,
        require: [true, 'Password is required.'],
    }, 
    role: {
        type: Number,
        default: 0,
    }
});
const User = mongoose.model<IUser>("User", UserSchema);

export { User };
