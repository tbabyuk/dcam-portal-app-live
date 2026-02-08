"use client"

import { FaRegEdit } from "react-icons/fa";
import { BsCheckCircle, BsXCircle } from "react-icons/bs"



export const AvailabilityTable = ({availability, handleEditAvailability}) => {

    return(
        <table className="table table-zebra w-auto mx-auto">
            <thead>
                <tr className="bg-gray-500 uppercase text-gray-100">
                    <th>Day</th>
                    <th>Time Range</th>
                    <th>Subbing</th>
                    <th>Teaching</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {availability && availability.map((item) => (
                    <tr key={item.day} className="">
                        <td>{item.day}</td>
                        <td>{item.from ? `${item.from} - ${item.until}` : "not available"}</td>
                        <td>{item.subbingOkay ? <BsCheckCircle className="text-green-500 mx-auto" size="20px" /> : <BsXCircle  className="text-red-500 mx-auto" size="20px" />}</td>
                        <td>{item.teachingOkay ? <BsCheckCircle className="text-green-500 mx-auto" size="20px" /> : <BsXCircle className="text-red-500 mx-auto" size="20px" />}</td>
                        <td>{!item.isEditable ? "" : <FaRegEdit size="1.1rem" className="text-gray-500 mx-auto cursor-pointer" title="edit availability" onClick={() => handleEditAvailability(item.day)} />}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}