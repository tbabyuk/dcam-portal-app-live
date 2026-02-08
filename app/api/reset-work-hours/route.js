import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { connectToStaffDB } from "@/db/database"
import { Meta } from "@/models/models"
import { getWeek } from "date-fns"



export const GET = async () => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "terry@strictlywebdev.com",
            pass: process.env.STRICTLY_EMAIL_APP_PASS
        }
    })

    const mailOptions = {
        from: "terry@strictlywebdev.com",
        to: ["terry@dacapomusic.ca"],
        subject: "Cron Job Ran",
        html: `
        <strong>Vercel cron job has run:</strong><br />
        <small>This email should have been set at midnight on Monday</small>
        `
    }

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "email was sent!" },{ status: 200 })

    } catch (error) {
        return NextResponse.json({message: "failed to send email"}, {status: 500})
    }
}




// export const POST = async (request) => {

//     const {secret} = await request.json()

//     if (!secret) {
//         return NextResponse.json({ message: "Secret is required" }, { status: 400 })
//     }

//     const isOddWeek = (date) => {
//         const weekNumber = getWeek(date);  // Get the week number for the given date
//         return weekNumber % 2 !== 0 ? true : false
//     }

//     const today = new Date();

//     if(isOddWeek(today)) {
//         return NextResponse.json({ message: "this week is odd, so no update is required" }, { status: 200 })
//     }

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: "terry@strictlywebdev.com",
//             pass: process.env.STRICTLY_EMAIL_APP_PASS
//         }
//     })

//     const mailOptions = {
//         from: "terry@strictlywebdev.com",
//         to: ["terry@dacapomusic.ca"],
//         subject: "Cron Job Ran",
//         html: `
//         <strong>Zapier cron job has run:</strong><br />
//         <small>Teacher work hours have been reset</small>
//         `
//     }

//     try {
//         await connectToStaffDB()
//         await Meta.updateMany(
//             { teacher: { $nin: ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'] } },  // update all teachers except these ones
//             { $set: { week1Submitted: false, week2Submitted: false } } // set submitted fields to "false"
//         )  
//         await transporter.sendMail(mailOptions);
//         return NextResponse.json({ message: "all submit fields updated successfully and email sent" },{ status: 200 })
//     } catch (error) {
//         console.log("Logging mongoDB error:", error)
//         return NextResponse.json({message: "failed to update some or all fields or send email"}, {status: 500})
//     }
// }
