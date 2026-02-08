"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

export interface BriefingData {
    title: string;
    content: string;
    source: string;
    topic: string;
}

const FALLBACK_BRIEFING: BriefingData = {
    title: "The Great Red Spot",
    content: "Jupiter's iconic storm is currently shrinking. Recent observations from the Hubble Space Telescope suggest the winds in the outermost lane of the storm are accelerating.",
    source: "NASA/JPL",
    topic: "PLANETARY SCIENCE"
};

async function fetchBriefingFromGemini(): Promise<BriefingData | null> {
    // DEVELOPER EXPERIENCE FIX: Bypass SSL certificate validation in development or if explicitly skipped
    if (process.env.NODE_ENV === 'development' || process.env.SKIP_SSL_CHECK === 'true') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Updated Schema: 2.5 Flash is current stable fast model, 2.0 Flash is next
        const models = ["gemini-2.5-flash", "gemini-2.0-flash", "models/gemini-flash-latest"];
        let result = null;
        let lastError = null; // Track the last error to show valid info

        for (const modelName of models) {
            try {
                console.log(`Attempting Daily Briefing with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const prompt = `
                    Generate a short "Daily Space Briefing" for today.
                    Pick a generic but interesting topic if there is no breaking news.
                    Return ONLY a valid JSON object with these exact keys:
                    - title: string (Headline, max 5 words)
                    - content: string (Brief summary, max 40 words)
                    - source: string (e.g. "NASA", "ESA", "SpaceX", or "Unknown")
                    - topic: string (e.g. "MARS MISSION", "BLACK HOLES", "COMMERCIAL SPACE")
                `;
                result = await model.generateContent(prompt);
                break; // If successful, stop trying
            } catch (e: any) {
                console.warn(`Model ${modelName} failed:`, e.message);
                lastError = e; // Store exact error object
                continue;
            }
        }

        if (!result) {
            // Throw the actual error from the last attempt (likely the most relevant one if all failed)
            throw new Error(`All models failed. Last error: ${lastError?.message || "Unknown"}`);
        }

        const text = result.response.text();
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);

    } catch (error: any) {
        console.error("Gemini Briefing Fetch Error:", error);
        // Return the error to the UI so we can see what's wrong
        return {
            title: "System Alert: Connection Failed",
            content: `Diagnostic: ${error.message || "Unknown Error"}. Timestamp: ${new Date().toLocaleTimeString()}`,
            source: "System Diagnostics",
            topic: "ERROR LOG"
        };
    }
}

export const getDailyBriefing = unstable_cache(
    async () => {
        const data = await fetchBriefingFromGemini();
        return data || FALLBACK_BRIEFING;
    },
    ["daily-briefing-debug-v4"], // Bumped version again
    { revalidate: 1 } // Fixed: Must be > 0
);
