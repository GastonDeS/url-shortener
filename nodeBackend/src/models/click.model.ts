import mongoose, { Schema } from "mongoose";

export interface IClick extends Document {
    shortUrl: string,
    accessDate: Date
}

const UserSchema: Schema = new mongoose.Schema({
    shortUrl: { type: String, required: true, ref: 'Url'},
    accessDate: { type: Date, required: true}
});

export default mongoose.model<IClick>('Click', UserSchema);


