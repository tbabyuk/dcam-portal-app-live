import mongoose from "mongoose";
import {connect} from "mongoose"



let isConnected = false;

export const connectToStaffDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected) {
        console.log("MongoDB is already connected")
        return
    }

    try {
        await connect(process.env.MONGODB_URI)
        isConnected = true;
        console.log("Connection established to dcam_staff collection")
    } catch (error) {
        console.log("Error connecting to mongoDB:", error)
    }
}