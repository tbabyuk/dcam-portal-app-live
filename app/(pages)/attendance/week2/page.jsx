"use client"

import { AttendanceForm } from "../../../components/AttendanceForm"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getStudentsByTeacher } from "../actions"

const WeekTwoAttendancePage = () => {

  const router = useRouter()
  const {data: session} = useSession()
  const [students, setStudents] = useState([])
  const [errorMessage, setErrorMessage] = useState("")

  const fetchStudents = async () => {
    const teacherFirstName = session?.user.name.toLowerCase()

    try {
      const students = await getStudentsByTeacher(teacherFirstName)
      if (students) {
        setStudents([...students])
      }
    } catch (error) {
      console.log("Error fetching students:", error)
    }
  }


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
              router.push("/attendance/completed")
              return;
          } else if (!result[0].week1Submitted) {
              setErrorMessage("Please submit Week 1 attendance first. Redirecting to Week 1...")
              setTimeout(() => {router.push("/attendance/week1")}, 2000)
              return;
          }
          fetchStudents()
      } catch (error) {
          console.log("Error fetching meta data:", error)
      }
  }

  useEffect(() => {
    checkAttendanceStatus()
  }, [session])



  return (
        <div className="py-10 px-8 md:px-24">
            <p className="text-center mb-6">
                {errorMessage && (<span className="text-red-500">{errorMessage}</span>)}
            </p>
            <AttendanceForm students={students} />
        </div>
  )
}

export default WeekTwoAttendancePage