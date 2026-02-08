"use client"

import { useSession } from "next-auth/react"


const DashboardPage = () => {

  const {data: session} = useSession()


  return (
    <main className="py-24 px-8 md:px-24 text-center">
        Welcome, {session?.user.name}! What would you like to do today?
    </main>
  )
}

export default DashboardPage