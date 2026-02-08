"use client"

// Figure out the closest payday to current date
import { useState, useEffect, useMemo, useCallback } from "react"
import { subDays, closestTo, format, parseISO } from "date-fns"



export const usePayday = () => {

  const [closestPaydayUnformatted, setClosestPaydayUnformatted] = useState("")
  const [closestPaydayFormatted, setClosestPaydayFormatted] = useState("")
  const [weekOneBoundaries, setWeekOneBoundaries] = useState({
    start: "loading...",
    end: "loading..."
  })
  const [weekTwoBoundaries, setWeekTwoBoundaries] = useState({
    start: "loading...",
    end: "loading..."
  })

  const getWeekOneBoundaries = useCallback((closest) => {
    const weekOneStartDate = subDays(closest, 18)
    const weekOneEndDate = subDays(closest, 12)
    setWeekOneBoundaries((prev) => ({...prev, start: format(weekOneStartDate, "MMM d, yyy" ), end: format(weekOneEndDate, "MMM d, yyy")}))
  }, [])

  const getWeekTwoBoundaries = useCallback((closest) => {
    const weekTwoStartDate = subDays(closest, 11)
    const weekTwoEndDate = subDays(closest, 5)
    setWeekTwoBoundaries((prev) => ({...prev, start: format(weekTwoStartDate, "MMM d, yyy" ), end: format(weekTwoEndDate, "MMM d, yyy")}))
  }, [])

  // All 2025 payday dates, organized by month:
  const paydayArray = useMemo(() => [
    ("2025-01-03"), ("2025-01-17"), ("2025-01-31"), 
    ("2025-02-14"), ("2025-02-28"), 
    ("2025-03-14"), ("2025-03-28"), 
    ("2025-04-11"), ("2025-04-25"), 
    ("2025-05-09"), ("2025-05-23"), 
    ("2025-06-06"), ("2025-06-20"), 
    ("2025-07-04"), ("2025-07-18"), 
    ("2025-08-01"), ("2025-08-15"), ("2025-08-29"), 
    ("2025-09-12"), ("2025-09-26"), 
    ("2025-10-10"), ("2025-10-24"), 
    ("2025-11-07"), ("2025-11-21"), 
    ("2025-12-05"), ("2025-12-19"),
    ("2026-01-02"), ("2026-01-16"),
    ("2026-01-30"), ("2026-02-13"),
    ("2026-02-27"), ("2026-03-13"),
    ("2026-03-27"), ("2026-04-10"),
    ("2026-04-24"), ("2026-05-08"),
    ("2026-05-22"), ("2026-06-05"),
    ("2026-06-19"), ("2026-07-03"),
    ("2026-07-17"), ("2026-07-31"),
    ("2026-08-14"), ("2026-08-28"),
    ("2026-09-11"), ("2026-09-25"),
    ("2026-10-09"), ("2026-10-23"),
    ("2026-11-06"), ("2026-11-20"),
    ("2026-12-04"), ("2026-12-18"),
  ].map(dateString => parseISO(dateString)), [])

  const getClosestPayday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const closestPayday = closestTo(today, paydayArray)
    setClosestPaydayUnformatted(closestPayday)
    setClosestPaydayFormatted(format(closestPayday, "MMMM d, yyy")) 
    getWeekOneBoundaries(closestPayday)
    getWeekTwoBoundaries(closestPayday)
  }
  

  useEffect(() => {
    getClosestPayday()
  }, [])

  return {closestPaydayFormatted, closestPaydayUnformatted, weekOneBoundaries, weekTwoBoundaries}
}