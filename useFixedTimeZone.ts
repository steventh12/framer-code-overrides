import { useEffect, useState } from "react"
import { Override } from "framer"

/**
 * Formats the current time for a fixed time zone, appending a GMT offset label.
 *
 * Example output: "15:42:05 GMT-07:00"
 */
function formatTimeWithOffset(): string {
    const timeZone = "America/Los_Angeles"
    const now = new Date()

    // Format the time in 24-hour format using the specified time zone
    const formattedTime = now.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })

    // Determine GMT offset for the specified time zone
    const tzOffsetMinutes = new Date(
        now.toLocaleString("en-US", { timeZone })
    ).getTimezoneOffset()

    const gmtOffsetHours = -tzOffsetMinutes / 60
    const sign = gmtOffsetHours >= 0 ? "+" : "-"
    const absOffset = Math.abs(gmtOffsetHours).toString().padStart(2, "0")

    const gmtLabel = `GMT${sign}${absOffset}:00`

    return `${formattedTime} ${gmtLabel}`
}

/**
 * Override: Renders a real-time clock in a fixed time zone with GMT offset.
 * - Updates every second
 * - Avoids SSR hydration mismatch by waiting for client-side mount
 * - Apply to a text layer in Framer
 */
export function UseFixedTimeZone(): Override {
    const [time, setTime] = useState("")
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)

        const updateTime = () => {
            setTime(formatTimeWithOffset())
        }

        updateTime() // Set time on initial render
        const interval = setInterval(updateTime, 1000)

        return () => clearInterval(interval) // Clean up on unmount
    }, [])

    if (!hasMounted) {
        // Prevent SSR/client mismatch
        return { children: null }
    }

    return {
        children: time,
        style: {
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            fontFeatureSettings: "'tnum' 1", // Tabular numbers
        },
    }
}