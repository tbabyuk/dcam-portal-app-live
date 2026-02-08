import {Schema, model, models} from "mongoose"



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    instruments: {
        type: [String],
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    availability: {
        type: Array
    }

}, {timestamps: true})



const metaSchema = new Schema({
    teacher: {
        type: String,
        required: true
    },
    instruments: {
        type: [String],
        default: [],
    },
    week1Submitted: {
        type: Boolean,
        required: true
    },
    week2Submitted: {
        type: Boolean,
        required: true
    },
    week1Total: {
        type: Number,
        default: 0
    },
    week2Total: {
        type: Number,
        default: 0
    },
    totalPay: {
        type: Number,
        required: true
    },
    payday: {
        type: String,
        required: true
    },
    notifyEmailSent: {
        type: Boolean,
        required: true
    },
    week1Notes: {
        type: String,
    },
    week2Notes: {
        type: String,
    },
    trainingVideosRecords: {
        type: Map,
        of: Boolean
    },
},{timestamps: true})



const studentSchema = new Schema({
    attendance: {
        type: Object,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pay: {
        type: Number,
        required: true
    },
    payday: {
        type: String,
        required: true
    },
    submitted: {
        type: Boolean,
        required: true
    },
    teacher: {
        type: String,
        required: true
    }
}, {timestamps: true})



const trainingVideoSchema = new Schema({
    instrument: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    shortTitle: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

}, {timestamps: true})




export const User = models.User || model("User", userSchema)
export const Student = models.Student || model("Student", studentSchema)
export const Meta = models.Meta || model("Meta", metaSchema)
export const TrainingVideo = models.TrainingVideo || model("TrainingVideo", trainingVideoSchema)