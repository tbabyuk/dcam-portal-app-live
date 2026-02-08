"use server"

import { supabaseServer } from "@/lib/supabaseServer"

// Helper function to parse duration string and return minutes
function parseDurationToMinutes(duration) {
    if (!duration) return 30 // default to 30 minutes
    
    // If it's already a number, return it
    if (typeof duration === 'number') return duration
    
    // Extract the number from the string (e.g., "30 min" -> 30, "45" -> 45)
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1], 10) : 30
}

// Calculate pay based on hourly rate and lesson duration
function calculateLessonPay(hourlyRate, durationMinutes) {
    return hourlyRate * (durationMinutes / 60)
}

export async function getStudentsByTeacher(teacherFirstName) {
    const { data, error } = await supabaseServer
        .from("teacher_instruments")
        .select(`
            teachers!inner(
                id,
                first_name,
                last_name,
                hourly_rate
            ),
            enrollments!inner(
                id,
                default_lesson_duration,
                students!inner(
                    id,
                    first_name,
                    last_name,
                    avatar_url,
                    status
                )
            )
        `)
        .ilike('teachers.first_name', teacherFirstName)
        .eq('enrollments.students.status', 'active')

    if (error) {
        console.error("Error fetching students:", error)
        return null
    }

    console.log("Raw data for teacher:", teacherFirstName, data)

    // Get teacher info from the first record (same teacher for all)
    const teacher = data?.[0]?.teachers
    const hourlyRate = teacher?.hourly_rate || 0

    // Flatten the nested structure, keeping enrollment data with student
    // Each enrollment is a separate row (same student can appear multiple times with different enrollments)
    const enrollments = data
        ?.flatMap(ti => ti.enrollments)
        ?.map(enrollment => ({
            ...enrollment.students,
            enrollment_id: enrollment.id,
            default_lesson_duration: enrollment.default_lesson_duration
        }))
        ?.filter(Boolean)
        // Only include active students (backup filter)
        ?.filter(student => student.status === 'active')
        // Transform to match what the component expects
        ?.map(student => {
            const durationMinutes = parseDurationToMinutes(student.default_lesson_duration)
            const lessonPay = calculateLessonPay(hourlyRate, durationMinutes)
            
            return {
                id: student.enrollment_id,  // Use enrollment ID as unique key
                student_id: student.id,
                student_name: `${student.first_name} ${student.last_name?.charAt(0) || ''}`,
                avatar_url: student.avatar_url,
                pay: lessonPay,
                duration: student.default_lesson_duration || "30 min",
                teacher_id: teacher?.id,
                teacher_name: `${teacher?.first_name || ''} ${teacher?.last_name?.charAt(0) || ''}`
            }
        })
    
    console.log("Enrollments for teacher:", teacherFirstName, enrollments)
    console.log("Teacher hourly rate:", hourlyRate)
    return enrollments
}
