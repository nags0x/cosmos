"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

export type SpaceNewsItem = {
    id: number;
    type: 'alert' | 'status' | 'info' | 'data';
    text: string;
    time: string;
    color: string;
};

// Hardcoded fallback news in case API fails
const FALLBACK_NEWS: SpaceNewsItem[] = [
    { id: 1, type: 'alert', color: 'text-destructive', text: "Solar Flare X1.2 detected", time: "2m ago" },
    { id: 2, type: 'status', color: 'text-accent', text: "ISS crossing territory", time: "14m ago" },
    { id: 3, type: 'info', color: 'text-muted-foreground', text: "Clear skies forecast: Chile", time: "45m ago" },
    { id: 4, type: 'data', color: 'text-foreground', text: "Deep space signal received", time: "1h ago" },
];

async function fetchFromGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    const genAI = new GoogleGenerativeAI(apiKey);

    // Helper to generate content with fallback
    const generate = async (modelName: string) => {
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 4 distinct "live" space news events for a sci-fi dashboard.
        Output a JSON array of objects with these exact keys:
        - "id" (number, 1-4)
        - "type" (one of: 'alert', 'status', 'info', 'data')
        - "text" (concise headline, max 40 chars)
        - "time" (relative time like '2m ago', 'Just now')
        - "color" (tailwind class: 'text-destructive' for alert, 'text-accent' for status, 'text-muted-foreground' for info, 'text-foreground' for data)
        
        Make them sound realistic but exciting (e.g. Solar flares, Satellite anomalies, Deep space signals, Asteroid flybys).`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return JSON.parse(response.text());
    }

    try {
        // Priority Fallback Chain: 2.5 -> 2.0 Exp -> 2.0 -> 1.5
        try {
            return await generate("gemini-2.5-flash");
        } catch (v25Error) {
            try {
                return await generate("gemini-2.0-flash-exp");
            } catch (v2Error) {
                try {
                    return await generate("gemini-2.0-flash");
                } catch (v2StdError) {
                    return await generate("gemini-1.5-flash");
                }
            }
        }
    } catch (error) {
        console.error("Gemini News Fetch Error:", error);
        return null;
    }
}

export const getSpaceNews = unstable_cache(
    async () => {
        const news = await fetchFromGemini();
        return news || FALLBACK_NEWS;
    },
    ["space-news-v1"],
    { revalidate: 3600 } // Update every hour
);
