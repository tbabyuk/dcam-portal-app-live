
// NO UI FOR THIS LOGIC IN THIS APP. EXAMPLE ONLY.

import { NextResponse } from "next/server"
import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models"


export async function POST(req) {

    const {name, email, password} = await req.json()

    console.log("from server:", name, email, password)

    try {
        await connectToStaffDB()
        await User.create({name, email, password})
        return NextResponse.json({message: "User successfully registered"}, {status: 201})

    } catch (error) {
        return NextResponse.json({message: "Error registering user"}, {status: 500})
    }
}


