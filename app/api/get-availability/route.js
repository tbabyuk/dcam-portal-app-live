import { NextResponse } from "next/server";
import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models";


export const POST = async (request) => {

    const {teacher} = await request.json()

    console.log("Logging teacher from Route Handler:", teacher)

    try {
        await connectToStaffDB()
        const availabilityArray = await User.findOne({"name": teacher}, {"availability": 1, "_id": 0})
        console.log("logging availabilityArray from Route Handler:", availabilityArray, typeof availabilityArray)
        return NextResponse.json(availabilityArray, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to get user availability"}, {status: 500})
    }

}