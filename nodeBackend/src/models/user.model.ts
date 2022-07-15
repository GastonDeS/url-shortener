import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password?: string,
    type: USER_TYPE,
}

export enum USER_TYPE {
    BASIC, PREMIUM
}

const UserSchema: Schema = new mongoose.Schema({
    username: {type: String, maxlength: 30},
    email: {type: String, unique: true, maxLength: 80},
    password: {type: String},
    type: {type: Number, enum: USER_TYPE, default: USER_TYPE.BASIC},
});

export default mongoose.model<IUser>('User', UserSchema);


