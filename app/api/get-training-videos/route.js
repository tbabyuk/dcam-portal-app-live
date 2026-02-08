import { connectToStaffDB } from "@/db/database";
import { User, TrainingVideo } from "@/models/models";
import { NextResponse } from "next/server";



export const POST = async (request) => {

    const {teacher} = await request.json()

    try {
        await connectToStaffDB()

        // First, get current user's instruments array
        const userObject = await User.findOne({name: teacher})
        const userInstrumentsArray = userObject.instruments;

        // Now, use instruments array to find relevant training video for each instrument inside the array
        const assignedVideos = await TrainingVideo.find({
            instrument: {$in: userInstrumentsArray}, // match instrument with any value in userInstrumentsArray
          });

        return NextResponse.json({videoList: assignedVideos}, {status: 200})
    } catch (error) {
        console.log("Logging mongoDB error:", error)
        return NextResponse.json({message: "Failed to update watched video"}, {status: 500})
    }
}



