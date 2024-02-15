import { mongoose, Schema } from "mongoose";

const DetailsSchema = new Schema({
    amount: Number,
    month: String,
    year: Number,
})

const memberSchema = new Schema({
    metaData: {
        created: { type: Date, default: Date.now, required: true },
        lastUpdated: { type: Date, default: Date.now, required: true },
    },
    data: {
        auth: { type: mongoose.Schema.Types.ObjectId, ref: 'authDetails', required: true, },
        saving: Number,
        loanRemaing: Number,
        loanMonth: String,
        savingDetails: [DetailsSchema],
        loanDetails: [DetailsSchema],
    },
})

export const memberDetailsModel = mongoose.model("members", memberSchema);