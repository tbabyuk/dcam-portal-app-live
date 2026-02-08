"use client"

import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { SidebarMobile } from "./SidebarMobile"



export const Navbar = () => {

    const [profileImage, setProfileImage] = useState("https://firebasestorage.googleapis.com/v0/b/dcam-staff.appspot.com/o/profile_photos%2Fuser_profile.jpg?alt=media&token=07ded636-a5c1-4e7a-bac0-b5a7c00716cb")
    const {data: session} = useSession()


    useEffect(() => {

      const fetchTeacherProfileImage = async () => {

        try {
          const res = await fetch("/api/teachers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher: session.user.name})
          })
          if (!res.ok) {
            throw new Error("Error fetching user image");
          }
          const {teacherImage} = await res.json()
          setProfileImage(teacherImage)

        } catch (error) {
            console.log("Error fetching user image", error.message)
        }
      }

      if(session?.user?.name) {
        fetchTeacherProfileImage()
      }

    }, [session?.user?.name])



    return (
        <nav className="px-4 h-[52px] bg-[#375681] text-gray-100 border-b-2 border-gray-200 flex items-center relative">
            <SidebarMobile />
            <div className="flex gap-4 ms-auto absolute right-4">
                {session?.user && (<span className="flex items-center mr-4">Hello, {session?.user.name}</span>)}
                <img src={profileImage} className="h-[34px] rounded-full" />
                {session?.user && (<button className="btn btn-outline btn-sm text-gray-100 z-50" onClick={() => signOut({ callbackUrl: "/" })}>Log Out</button>)}
            </div>
        </nav>
    )
  }