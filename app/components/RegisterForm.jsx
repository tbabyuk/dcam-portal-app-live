"use client"

import { useState } from "react"

export const RegisterForm = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")


  const handleSubmit = async (e) => {

    e.preventDefault()
    if(!name || !email || !password) {
        setError("Please complete all fields")
        return;
    }

    // check if current email address already in database
    try {
        const res = await fetch("/api/user-exists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        })

        const {user} = await res.json()

        if(user) {
            setError("Ooops, this email is already registered.")
            return;
        }
    } catch (error) {
        console.log("An error occured while checking if user exists", error.message)
    }

    // if current email is not already in database, register user
    try {
        setError("")
        const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name, email, password})
            })
        const {message} = await res.json()
        console.log("res from client:", message)
    } catch (error) {
        console.log("An error occured with your registration", error.message)
    }
  }
  

  return (
        <form 
            className="flex flex-col w-[300px] bg-gray-600 text-gray-100 rounded-md mx-auto p-5" 
            onSubmit={handleSubmit}>
            <h2 className="text-lg text-center mb-2">Register</h2>
            <label>
                <span className="block mb-1">Full Name:</span>
                <input type="text" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <span className="block mb-1">Email:</span>
                <input type="email" className="w-full" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                <span className="block mb-1">Password:</span>
                <input type="password" className="w-full" onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button className="bg-green-600 hover:bg-green-700 py-2 text-gray-100 rounded">Register</button>
            <div className="text-red-500 text-sm mt-2 h-4">{error && error}</div>
        </form>
    )
}