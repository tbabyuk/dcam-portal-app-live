"use client"

import ReactPlayer from "react-player"
import { useState, useEffect } from "react"
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs"
import { useSession } from "next-auth/react"
import { PageHeader } from "@/app/components/PageHeader"
import { useTrainingVideosData } from "@/app/context/TrainingVideosContext"


const TrainingPage = () => {

  const {data: session} = useSession()
  const [isClient, setIsClient] = useState(false)
  const {assignedTrainingVideos, teacherTrainingVideosData, setTeacherTrainingVideosData} = useTrainingVideosData()


  const handleVideoEnd = async (watchedVideo) => {
    // update mongoDB with the video that was just watched
    try {
      const res = await fetch("/api/training", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({teacher: session?.user.name.toLowerCase(), watchedVideo})
      })
      const {message} = await res.json()

      if(message === "success") {
          setTeacherTrainingVideosData((prev) => ({...prev, [watchedVideo]: true}))
      }

      } catch (error) {
          console.log("Error with post request:", error)
          setTeacherTrainingVideosData((prev) => ({...prev, [watchedVideo]: false}))
      }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);



if (!isClient) return null;

  return (
    <>
      <PageHeader>
          <h2>Dear teachers, here you will find training videos on the various topics you will need to know to be effective and knowledgeable as a teacher. Most of the videos are mandatory and you might be given a quiz that you will need to successfully pass based on these videos (more on this later).</h2>
      </PageHeader>
      <div className="px-5 py-12 md:px-12 lg:px-16 flex flex-wrap gap-4 gap-y-8 justify-evenly items-center">
            {assignedTrainingVideos && assignedTrainingVideos.map((video, index) => (
                <div key={index} className="w-[390px] rounded-xl overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-medium text-center">{video.title}</h3>
                      {teacherTrainingVideosData?.[video.shortTitle] ? (<div className="flex text-green-500"><span>watched</span><BsCheckCircleFill size="1.4rem" className="ms-2" /></div>) : (<div className="flex text-red-500"><span>unwatched</span><BsXCircleFill size="1.4rem" className="ms-2" /></div>)}
                  </div>
                  <ReactPlayer
                      className=""
                      url={video.url}
                      width="100%"
                      height="100%"
                      onEnded={() => handleVideoEnd(video.shortTitle)}
                      controls
                  />
                </div>               
              ))
            }
        </div>
    </>
  )
}

export default TrainingPage