import { CelestialEvent } from "./types";

export function generateGoogleCalendarUrl(event: CelestialEvent): string {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";

    // Format dates for Google Calendar (YYYYMMDDTHHMMSSZ)
    // Simple heuristic: if full ISO string provided, use it. If just YYYY-MM-DD, assume all day.

    let dates = "";

    try {
        if (event.startTime && event.endTime) {
            // Construct full timestamp if times provided
            // Assuming event.date is YYYY-MM-DD
            const start = new Date(`${event.date}T${event.startTime}`).toISOString().replace(/-|:|\.\d\d\d/g, "");
            const end = new Date(`${event.date}T${event.endTime}`).toISOString().replace(/-|:|\.\d\d\d/g, "");
            dates = `&dates=${start}/${end}`;
        } else {
            // All day event
            const dateStr = event.date.replace(/-/g, "");
            // Next day for end date logic in GCal all-day events
            const nextDate = new Date(new Date(event.date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, "");
            dates = `&dates=${dateStr}/${nextDate}`;
        }
    } catch (e) {
        console.error("Date parsing error", e);
        // Fallback to simple date
        const safeDate = event.date.replace(/-/g, "");
        dates = `&dates=${safeDate}/${safeDate}`;
    }

    const details = encodeURIComponent(`${event.description || ''}\n\nAdded via Antigravity Space Suite 🚀`);
    const text = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location || "The Sky");

    return `${baseUrl}&text=${text}&details=${details}&location=${location}${dates}`;
}
