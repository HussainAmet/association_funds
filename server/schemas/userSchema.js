import { mongoose, Schema } from "mongoose";

const userSchema = new Schema({
    metaData: {
        joined: { type: Date, default: Date.now, required: true },
        lastActivity: { type: Date, default: Date.now, required: true },
    },
    data: {
        phone: { type: Number, required: true, unique: true },
        name: { type: String, required: true },
        role: [{ type: String, enum: ['host', 'member'], required: true }],
    }
});

export const userModel = mongoose.model("authDetails", userSchema);