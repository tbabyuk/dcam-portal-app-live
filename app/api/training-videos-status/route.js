import { connectToStaffDB } from "@/db/database";
import { Meta } from "@/models/models";
import { NextResponse } from "next/server";



export const POST = async (request) => {

    const {teacher} = await request.json()

    console.log("loggin teacher from training video status API++++++++++++++++:", teacher)

    try {
        await connectToStaffDB()
        const user = await Meta.findOne({ teacher: teacher });
        console.log("logging user Training videos from APIIIIIIIIIIIIIII", user.trainingVideosRecords)
        return NextResponse.json({trainingVideosData: user.trainingVideosRecords}, {status: 200})
    } catch (error) {
        console.log("Logging mongoDB error:", error)
        return NextResponse.json({message: "Failed to fetch user from MongoDB"}, {status: 500})
    }
}

