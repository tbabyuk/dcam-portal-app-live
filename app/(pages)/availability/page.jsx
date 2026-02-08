"use client"

import { PageHeader } from "@/app/components/PageHeader";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import { EditAvailabilityModal } from "@/app/components/EditAvailabilityModal";
import { AvailabilityTable } from "./AvailabilityTable";




const AvailabilityPage = () => {

    const {data: session} = useSession()
    const [availability, setAvailability] = useState([])
    const [editAvailabilityModalOpen, setEditAvailabilityModalOpen] = useState(false);
    const [dayToEdit, setDayToEdit] = useState("")

    
    const handleCloseEditAvailabilityModal = (e) => {
        if(e.target.dataset.role === "modal") {
          setEditAvailabilityModalOpen(false)
        }
    }

    
    const getTeacherAvailability = async () => {
        try {
            const res = await fetch("/api/get-availability", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({teacher: session?.user.name})
            })
                const result = await res.json()
                setAvailability(result.availability)
                  } catch (error) {
                console.log("Error fetching availability:", error)
            }
    }

    const handleEditAvailability = (day) => {
        setDayToEdit(day)
        setEditAvailabilityModalOpen(true)
    }

    useEffect(() => {
        getTeacherAvailability()
    }, [])

    return (
        <>
            <PageHeader>
                <h2>Dear teachers, on this page, you can set your availability for both teaching and subbing work. The admin will use these records to reach out to you if or when we have a need for a teacher or a sub on a particular day. <span className="underline">It is your responsibility to keep these records accurate and updated. The admin always assumes the information here is up to date.</span></h2>
            </PageHeader>
            <p className="text-[12px] text-black/60 p-5 text-center">Please note that for reasons of consistency and predictability for the school, you are not able to edit the days you are currently working (if you ever need to change these, please talk to admin). However, for the days you are not currently working or subbing, you can edit your information at any time. Keep in mind that if you choose &quot;teaching&quot; for a particular day, it is automatically assumed that you can sub for that day too. However, if you choose &quot;subbing&quot; only, that means you don&apos;t want to have weekly lessons on that particular day, but are open to coming in to sub once in a while when needed.</p>
            <div className="pt-10 pb-10 px-5 md:px-10">
                <div className="overflow-x-auto">
                    <AvailabilityTable availability={availability} handleEditAvailability={handleEditAvailability} />
                </div>
                {editAvailabilityModalOpen && 
                    <EditAvailabilityModal handleCloseEditAvailabilityModal={handleCloseEditAvailabilityModal} setEditAvailabilityModalOpen={setEditAvailabilityModalOpen} dayToEdit={dayToEdit} getTeacherAvailability={getTeacherAvailability} />
                }
            </div>
        </>    
    )
}


export default AvailabilityPage;