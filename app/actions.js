"use server"

import { connectToStaffDB } from "@/db/database";
import { User } from "@/models/models";
import nodemailer from "nodemailer"



export const editAvailabilityAction = async (teacher, dayToEdit, availability) => {

    // console.log("logging form data from editHours action", teacher, dayToEdit, availability)

    const {
        fromHour,
        fromMinute, 
        fromMeridiem,
        untilHour,
        untilMinute,
        untilMeridiem,
        subbingOkay,
        teachingOkay,
        notAvailable} = availability;


    try {
        await connectToStaffDB()
        const result = await User.updateOne(
            { name: teacher, "availability.day": dayToEdit }, 
            { 
                $set: { 
                    "availability.$.from": fromHour ? `${fromHour}:${fromMinute}${fromMeridiem}` : "",
                    "availability.$.until": untilHour ? `${untilHour}:${untilMinute}${untilMeridiem}` : "",
                    "availability.$.subbingOkay": subbingOkay,
                    "availability.$.teachingOkay": teachingOkay,
                    "availability.$.notAvailable": notAvailable,
                    "availability.$.isEditable": true
                }
            }
        );
        console.log("logging result from actions:", result)
            return {success: true, message: `Hours for ${dayToEdit} have been successfully updated`}
    } catch (error) {
            return {success: false, message: `Failed to update hours for ${dayToEdit}`}
    }
}


export const sendNotifyAdminEmailAction = async (teacher, day) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "info@dacapomusic.ca",
            pass: process.env.INFO_EMAIL_PASS
        }
    })


    const notifyEmailOptions =
    {
        from: "info@dacapomusic.ca",
        to: "info@dacapomusic.ca",
        subject: `${teacher} has updated their hours for ${day} `,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 0 0 30px 0">
                <p>Please check their updated hours on admin.dacapomusic.ca</p>
            </div>
        `
    }

    try {
        await transporter.sendMail(notifyEmailOptions);
        return {success: true, message: "Email sent successfully!"};
    } catch (error) {
        console.log("error sending contact email:", error.message)
        return {success: false, message: "Failed to send email."};
    }
}