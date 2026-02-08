import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models";
import { NextResponse } from "next/server";




export const POST = async (request) => {

    const {teacher} = await request.json()

        try {
            await connectToStaffDB()
            const userObject = await User.findOne({ name: teacher })
            const teacherImage = userObject.profileImage;
            return NextResponse.json({teacherImage: teacherImage}, {status: 200})
        } catch (error) {
            console.log("Logging mongoDB error:", error)
            return NextResponse.json({message: "Failed to fetch profile image"}, {status: 500})
        }
}