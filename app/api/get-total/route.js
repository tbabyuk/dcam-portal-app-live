import { connectToStaffDB } from "@/db/database";
import { NextResponse } from "next/server";
import { Meta } from "@/models/models";


export const POST = async (request) => {
    
    const {teacher} = await request.json()

    console.log("logging teacher name from /get-total API:", teacher)

    try {
        await connectToStaffDB()

        // Get the stored totalPay from Meta (calculated when week 2 was submitted)
        const meta = await Meta.findOne({"teacher": teacher})
        const totalPay = meta?.totalPay || 0

        console.log("Logging totalPay from 'get-total' route:", totalPay)

        return NextResponse.json({totalPay}, {status: 200})

    } catch (error) {
        console.log("something went wrong with getting total pay:", error.message)
        return NextResponse.json({message: "Failed to get total pay"}, {status: 500})
    }
}

