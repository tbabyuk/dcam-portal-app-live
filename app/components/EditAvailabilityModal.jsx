"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { editAvailabilityAction, sendNotifyAdminEmailAction } from "../actions";
import {HiOutlineClock} from "react-icons/hi"


const availabilityObject = {
    fromHour: "",
    fromMinute: "",
    fromMeridiem: "",
    untilHour: "",
    untilMinute: "",
    untilMeridiem: "",
    subbingOkay: false,
    teachingOkay: false,
    notAvailable: false
}


export const EditAvailabilityModal = ({handleCloseEditAvailabilityModal, setEditAvailabilityModalOpen, dayToEdit, getTeacherAvailability}) => {

    const [availability, setAvailability] = useState(availabilityObject)
    const [submitting, setSubmitting] = useState(false)

    const {data: session} = useSession()

    
    const handleEditAvailability = async (e) => {
        e.preventDefault()
        // const formData = new FormData(e.target)
        try {
            setSubmitting(true)
            const res = await editAvailabilityAction(session?.user.name, dayToEdit, availability)
            setEditAvailabilityModalOpen(false)
            getTeacherAvailability()
            await sendNotifyAdminEmailAction(session?.user.name, dayToEdit)
            console.log(res.message)
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    const handleSetNotAvailable = () => {
        // setAvailability(prev => ({...prev, notAvailable: !prev.notAvailable}))
        if(!availability.notAvailable) {
            setAvailability(availabilityObject)
            setAvailability(prev => ({...prev, notAvailable: true}))
        } else {
            setAvailability(prev => ({...prev, notAvailable: false}))
        }
    }


  return (
        <div className="overlay fixed z-50 top-0 left-0 w-full h-[100vh] bg-black/80 overflow-y-auto" data-role="modal" onClick={(e) => handleCloseEditAvailabilityModal(e)}>
            <span className="exit absolute cursor-pointer top-1 right-5 text-gray-100 font-semibold text-[3rem]"  data-role="modal">&#10005;</span>
            <form className="form-control w-[380px] max-w-[90%] mt-[70px] bg-gray-100 py-5 px-6 md:px-10 rounded-md mx-auto" onSubmit={handleEditAvailability}>
                <h2 className="text-lg font-semibold text-gray-600 text-center pb-6">Update Hours:</h2>
                <p className="text-sm text-gray-500 mb-8">Choose your availability for <span className="font-semibold">{dayToEdit}</span>:</p>
                <div className="mb-6">
                    <div className="flex items-center mb-2 text-gray-500">
                        <HiOutlineClock size="1rem" />
                        <label htmlFor="from-hour" className="block text-sm ms-2">Available from:</label>
                    </div>
                    <div className="flex">
                        <select id="from-hour" name="from-hour" className="select rounded-r-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, fromHour: e.target.value}))} value={availability.fromHour}>
                            <option value="" disabled>hours</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select name="from-minute" className="select rounded-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, fromMinute: e.target.value}))} value={availability.fromMinute}>
                            <option value="" disabled>mins</option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select name="from-am/pm" className="select rounded-l-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, fromMeridiem: e.target.value}))} value={availability.fromMeridiem}>
                            <option value="" disabled>am/pm</option>
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center mb-2 text-gray-500">
                        <HiOutlineClock size="1rem" />
                        <label htmlFor="until-hour" className="block text-sm ms-2">Available until:</label>
                    </div>
                    <div className="flex">
                        <select id="until-hour" name="until-hour" className="select rounded-r-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, untilHour: e.target.value}))} value={availability.untilHour}>
                            <option value="" disabled>hours</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select name="to-minute" className="select rounded-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, untilMinute: e.target.value}))} value={availability.untilMinute}>
                            <option value="" disabled>mins</option>
                            <option value="00">00</option>
                            <option value="15">15</option>
                            <option value="30">30</option>
                            <option value="45">45</option>
                        </select>
                        <select name="to-am/pm" className="select rounded-l-none select-sm w-full bg-white" required disabled={availability.notAvailable} onChange={(e) => setAvailability(prev => ({...prev, untilMeridiem: e.target.value}))} value={availability.untilMeridiem}>
                            <option value="" disabled>am/pm</option>
                            <option value="am">am</option>
                            <option value="pm">pm</option>
                        </select>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="flex items-center mb-2 text-gray-500">
                        <HiOutlineClock size="1rem" />
                        <span className="block text-sm ms-2">Type of work:</span>
                    </div>
                    <div className="flex">
                        <div className="flex items-center w-[50%] mb-2 text-gray-500">
                            <label htmlFor="subbing" className="block text-sm ms-2">Subbing:</label>
                            <input type="checkbox" id="subbing" name="subbing" className="ms-3 mb-0 w-4 h-4" required={!availability.subbingOkay && !availability.teachingOkay} disabled={availability.notAvailable} checked={availability.subbingOkay} onChange={(e) => {setAvailability(prev => ({...prev, subbingOkay: !prev.subbingOkay})); e.target.setCustomValidity("")}} onInvalid={(e) => e.target.setCustomValidity("Please choose type(s) of work you are available for.")} />
                        </div>
                        <div className="flex items-center w-[50%] mb-2 text-gray-500">
                            <label htmlFor="teaching" className="block text-sm ms-2">Teaching:</label>
                            <input type="checkbox" id="teaching" name="teaching" className="ms-3 mb-0 w-4 h-4" required={!availability.subbingOkay && !availability.teachingOkay} disabled={availability.notAvailable} checked={availability.teachingOkay} onChange={() => setAvailability(prev => ({...prev, teachingOkay: !prev.teachingOkay}))} />
                        </div>
                    </div>
                </div>
                <div className="mb-6 flex justify-center relative text-gray-500">
                    <div className="absolute border-b-2 border-gray-300 w-[40%] top-1/2 left-0" />
                    <span>OR</span>
                    <div className="absolute border-b-2 border-gray-300 w-[40%] top-1/2 right-0" />
                </div>
                <div className="flex items-center text-gray-500 mb-8">
                    <HiOutlineClock size="1rem" />
                    <label htmlFor="not-available" className="block text-sm ms-2">Not Available:</label>
                    <input type="checkbox" id="not-available" name="not-available" className="ms-3 mb-0 w-4 h-4" checked={availability.notAvailable} onChange={handleSetNotAvailable} />
                </div>
                <button className="btn btn-md btn-primary">{submitting ? "Submitting..." : "Submit"}</button>
            </form>
        </div>
    )
}