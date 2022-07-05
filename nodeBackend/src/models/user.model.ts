import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    email: string,
    password?: string,
    type: USER_TYPE,
}

export enum USER_TYPE {
    PERSON, PREMIUM
}

const UserSchema: Schema = new mongoose.Schema({
    email: {type: String, unique: true, maxLength: 80},
    password: {type: String},
    type: {type: Number, enum: USER_TYPE, default: USER_TYPE.PERSON},
});

export default mongoose.model<IUser>('User', UserSchema);


