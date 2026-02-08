"use client"

import { usePayday } from "../hooks/usePayday"
import { usePathname } from "next/navigation"
import { PageHeader } from "./PageHeader"


export const AttendanceHeader = () => {
  
  const path = usePathname()
  const {closestPaydayFormatted, weekOneBoundaries, weekTwoBoundaries} = usePayday()

  console.log("logging closest payday from Subheader:", closestPaydayFormatted)

  return (
      <PageHeader>
          <p className="px-4 pb-2">Your closest payday is:&nbsp;&nbsp;<span className="font-semibold">{closestPaydayFormatted}</span></p>
          {path === "/attendance/week1" ? 
            (<p className="px-4 pt-2 text-center border-t-2 border-t-gray-300">
            Submitting attendance for week 1 of 2:&nbsp;&nbsp;<span className="font-semibold">{weekOneBoundaries.start} - {weekOneBoundaries.end}</span></p>)
          : path === "/attendance/week2" ? 
            (<p className="pt-2 border-t-2 border-t-gray-300">
            Submitting attendance for week 2 of 2:<br /><span className="font-semibold">{weekTwoBoundaries.start} - {weekTwoBoundaries.end}</span></p>) 
          : ""
          }
      </PageHeader>
  )
}