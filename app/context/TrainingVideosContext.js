"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";


const TrainingVideosContext = createContext()


export const TrainingVideosStatusProvider = ({children}) => {

    const [assignedTrainingVideos, setAssignedTrainingVideos] = useState([])
    const [teacherTrainingVideosData, setTeacherTrainingVideosData] = useState({})
    const {data: session} = useSession()

    
    const getTeacherTrainingVideosData = async () => {

        try {
          const res = await fetch("/api/training-videos-status", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
          })
          const {trainingVideosData} = await res.json()

          setTeacherTrainingVideosData(trainingVideosData)
    
          } catch (error) {
              console.log("Error with post request:", error)
          }
      }


    const getAssignedTrainingVideos = async () => {
    
        try {
        const res = await fetch("/api/get-training-videos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher: session?.user.name})
        })
        const {videoList} = await res.json()
    
        setAssignedTrainingVideos(videoList)
    
        } catch (error) {
            console.log("Error with post request:", error)
        }
    }


    useEffect(() => {
        if(session?.user?.name) {
            getAssignedTrainingVideos()
        }
    }, [session?.user?.name])


    useEffect(() => {
        if(assignedTrainingVideos.length > 0) {
            getTeacherTrainingVideosData()
        }
    }, [assignedTrainingVideos])

    return(
        <TrainingVideosContext.Provider value={{assignedTrainingVideos, teacherTrainingVideosData, setTeacherTrainingVideosData}}>
            {children}
        </TrainingVideosContext.Provider>
    )
}


export const useTrainingVideosData = () => useContext(TrainingVideosContext);