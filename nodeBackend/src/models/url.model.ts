import mongoose, { Schema } from "mongoose";

export interface IUrl extends Document {
    userId: string
    shortUrl: string,
    url: string,
    labels: string[],
}

const UrlSchema: Schema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    url: {type: String },
    shortUrl: {type: String, unique: true},
    labels: {type: [String] },
});

export default mongoose.model<IUrl>('Url', UrlSchema);


