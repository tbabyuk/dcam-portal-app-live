import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models"
import { NextResponse } from "next/server"

// check if user already exists when registering

export const POST = async (req) => {
    const {email} = await req.json()

    try {
        await connectToStaffDB()
        const user = await User.findOne({email}).select("_id")
        console.log("Logging user from db search:", user) 
        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json({message: "an error occured"}, {status: 500})
    }
}