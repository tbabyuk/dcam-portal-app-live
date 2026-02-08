"use client"

import DocLink from "@/app/components/DocLink"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { PageHeader } from "@/app/components/PageHeader"


const DocsPage = () => {

    const {data: session} = useSession()

    const [docsArray, setDocsArray] = useState([])
    const [message, setMessage] = useState("")


    console.log("Logging docsArray:", docsArray)

    
    useEffect(() => {

      const getDocs = async () => {

        try {
          const res = await fetch("/api/get-docs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({teacher: session?.user.name.toLowerCase()})
          })

          const {t4a_docs} = await res.json()

          console.log("logging t4a_docs from DocsPage", t4a_docs)

          if(t4a_docs) {
            setDocsArray(t4a_docs)
          } else {
            setMessage("No docs available yet!")
          }

        } catch (error) {
            console.log("Error fetching docs:", error)
        }
      }

      getDocs()

    }, [session])
  
    return (
        <>
          <PageHeader>
              <h2>Dear teachers, here you will find your T4A slips for tax purposes. These are issued by the end of February for the previous calendar year. As long as you made at least $500.00 during the previous calendar year, you will be issued a T4A slip. If you think you are owed a T4A slip but do not see it here, please contact admin.</h2>
          </PageHeader>
          <div className="pt-16 pb-10 px-5 md:px-10">
              {docsArray && (
                <div className="flex flex-col gap-8 text-center sm:text-left">
                  {docsArray.map((doc, index) => (
                    <DocLink key={index} doc={doc} />
                  ))}
                </div>
              )}
              {message && (<p>{message}</p>)}
          </div>
        </>
    )
  }
  
  export default DocsPage