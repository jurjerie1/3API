import { Model, Document } from 'mongoose';
import { IUser } from '../models/User';
import bcrypt from "bcrypt";


class UserRepository {
    private model: Model<Document & IUser>;

    constructor(model: Model<Document & IUser>) {
        this.model = model;
    }

    getAllUsers(): Promise<IUser[]> {
        return this.model.find();
    }

    getUserById(id: string): Promise<IUser | null> {
        return this.model.findById(id).exec();
    }

    createUser(user: IUser): Promise<IUser> {
        return this.model.create(user);
    }

    deleteUser(id: string): Promise<IUser | null> {
        return this.model.findByIdAndDelete(id).lean().exec();
    }

    updateUser(id: string, train: IUser): Promise<IUser | null> {
        return this.model.findByIdAndUpdate(id, train, { new: true }).lean().exec();
    }

    async findUserByEmailOrUsername(email: String, pseudo: String): Promise<IUser | null> {
        return this.model.findOne({ $or: [{ email, pseudo }] });
    }

    async findUserByEmailAndPassword(email: string, password: string): Promise<IUser | null> {
        const user = await this.model.findOne({ email });

        if (user && (await bcrypt.compare(password, String(user.password)))) {
            return user;
        }

        return null;
    }

}

export default UserRepository;
