import mongoose, { Schema } from "mongoose";

export interface IUrl extends Document {
    userId: string,
    name: string,
    shortUrl: string,
    url: string,
    labels: string[],
    clicks: number,
    lastRenew: Date
}

const UrlSchema: Schema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    url: {type: String, required: true },
    shortUrl: {type: String, unique: true, index: true, required: true},
    labels: {type: [String] },
    clicks: {type: Number, default: 0},
    lastRenew: {type: Date, default: Date.now()}
},{ timestamps: { createdAt: 'creationTime' } });

export default mongoose.model<IUrl>('Url', UrlSchema);


