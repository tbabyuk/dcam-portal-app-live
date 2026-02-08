"use client"

import { usePayday } from "@/app/hooks/usePayday"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const CompletedPage = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const {closestPaydayFormatted} = usePayday()
  const [errorMessage, setErrorMessage] = useState("")
  const [payTotal, setPayTotal] = useState(null)



  const getPayTotal = async () => {
    try {
      const res = await fetch("/api/get-total", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
    })
        const {totalPay} = await res.json()
        setPayTotal(totalPay)

    } catch (error) {
      console.log("error getting total pay:", error.message)
    }
  }

  // check if attendance for both week 1 and 2 has been submitted
  const checkAttendanceStatus = async () => {
    try {
      const res = await fetch("/api/check-meta", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
      })
          const result = await res.json()

          if(result[0].week1Submitted && result[0].week2Submitted) {
              // get total pay owed
              getPayTotal()
              return;
          } else {
              setErrorMessage("Please complete your attendance. Redirecting...")
              setTimeout(() => {router.push("/attendance/week1")}, 3000)
              return;
          }

      } catch (error) {
          console.log("Error fetching meta data:", error)
      }
    }
  

  useEffect(() => {
    checkAttendanceStatus()
  }, [session])



  return (
      <div className="py-20 px-8 md:px-24">
        <p className="text-center mb-6">
            {errorMessage 
                ? (<span className="text-red-600">{errorMessage}</span>)
                : (<span className="text-green-600">
                        Your attendance for the <span className="font-semibold">{closestPaydayFormatted}</span> payday has been submitted!<br /><br /> 
                        Your total for this pay period is <span className="font-semibold">${payTotal && payTotal.toFixed(2)}</span><br /><br />
                        Keep in mind that this total might be adjusted depending on the accuracy of your submission and any additional pay owed to you
                  </span>)
            }
        </p>
      </div>
  )
}

export default CompletedPage