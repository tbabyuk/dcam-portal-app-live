import { connectToStaffDB } from "@/db/database";
import { NextResponse } from "next/server";
import { Student, Meta } from "@/models/models";



export const POST = async (request) => {
    
    const {attendance, teacher, week, payday, teacherNotes, total} = await request.json()

    console.log("logging request from /submit API:", attendance, teacher, week, payday, teacherNotes, total)

    const getAttendanceKey = () => {
        if(week === "week1Submitted") {
            return "attendance.week1"
        } else {
            return "attendance.week2"
        }
    }

    const getNotesKey = () => {
        if(week === "week1Submitted") {
            return "week1Notes"
        } else {
            return "week2Notes"
        }
    }

    const getWeekTotalKey = () => {
        if(week === "week1Submitted") {
            return "week1Total"
        } else {
            return "week2Total"
        }
    }

    console.log("from submit API:", Object.entries(attendance))

    
    try {
        await connectToStaffDB();

        Object.entries(attendance).forEach( async ([key, value]) => {
            await Student.updateOne({"teacher": teacher, "name": key },
                                    {$set: {[getAttendanceKey()]: value}})
        })

        // Save weekly total and notes
        await Meta.updateOne(
            {"teacher": teacher}, 
            {$set: {[week]: true, "payday": payday, [getNotesKey()]: teacherNotes, [getWeekTotalKey()]: total}}
        )

        // If week 2 is being submitted, calculate and save totalPay
        if (week === "week2Submitted") {
            // Fetch the current meta to get week1Total
            const meta = await Meta.findOne({"teacher": teacher})
            const week1Total = meta?.week1Total || 0
            const week2Total = total
            const totalPay = week1Total + week2Total

            await Meta.updateOne(
                {"teacher": teacher}, 
                {$set: {"totalPay": totalPay}}
            )
            
            console.log("Calculated totalPay:", totalPay, "(week1:", week1Total, "+ week2:", week2Total, ")")
        }

        return NextResponse.json({message: "success"}, {status: 200})

    } catch (error) {
        console.log("Error submitting attendance:", error)
        return NextResponse.json({message: "Failed to submit attendance"}, {status: 500})
    }
}

