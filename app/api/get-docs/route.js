import { NextResponse } from "next/server";
import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models";


export const POST = async (request) => {

    const {teacher} = await request.json()

    try {
        await connectToStaffDB()
        const docsArray = await User.findOne({"name": teacher[0].toUpperCase() + teacher.slice(1)}, {"t4a_docs": 1, "_id": 0})
        return NextResponse.json(docsArray, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to get user docs"}, {status: 500})
    }

}