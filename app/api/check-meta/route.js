import { connectToStaffDB } from "@/db/database";
import { Meta } from "@/models/models";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    
    const {teacher} = await request.json()

    console.log("logging teacher name from /check-meta API:", teacher)

    try {
        await connectToStaffDB()
        const result = await Meta.find({"teacher": teacher})

        console.log("logging attendanceSubmitted:", result)

        // return new Response(JSON.stringify(result), {status: 200})
        return NextResponse.json(result, {status: 200})

    } catch (error) {
        // return new Response("Failed to fetch students", {status: 500})
        return NextResponse.json({message: "Failed to fetch students"}, {status: 500})
    }
}

