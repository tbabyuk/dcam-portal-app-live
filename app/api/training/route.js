import { connectToStaffDB } from "@/db/database";
import { Meta } from "@/models/models";
import { NextResponse } from "next/server";



export const POST = async (request) => {

    const {teacher, watchedVideo} = await request.json()

    console.log("loggin watched Video from training API++++++++++++++++:", teacher, watchedVideo)

    try {
        await connectToStaffDB()
        await Meta.updateOne({"teacher": teacher}, {$set: {[`trainingVideosRecords.${watchedVideo}`]: true}})
        return NextResponse.json({message: "success"}, {status: 200})
    } catch (error) {
        console.log("Logging mongoDB error:", error)
        return NextResponse.json({message: "Failed to update watched video"}, {status: 500})
    }
}

