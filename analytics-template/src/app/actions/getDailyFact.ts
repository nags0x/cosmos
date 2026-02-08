"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { unstable_cache } from "next/cache";

// Hardcoded fallback facts in case API fails or key is missing
const FALLBACK_FACTS = [
    "Neutron stars can spin at a rate of 600 rotations per second.",
    "A day on Venus is longer than a year on Venus.",
    "There are more stars in the universe than grains of sand on all the Earth's beaches.",
    "The footprints on the Moon will be there for 100 million years.",
    "One million Earths could fit inside the Sun."
];

async function fetchFactFromGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("SERVER ACTION: Fetching fact. Key present:", !!apiKey);

    if (!apiKey) {
        console.warn("GEMINI_API_KEY is missing. Using fallback fact.");
        return null;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Helper to generate content with fallback
        const generate = async (modelName: string) => {
            const model = genAI.getGenerativeModel({ model: modelName });
            const date = new Date();
            const dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

            const prompt = `Generate a short "On This Day in Space History" fact for today, ${dateString}.
             If nothing significant happened on this exact date, provide a fascinating fact about the current season's night sky or a general astronomy fact.
             Keep it concise (under 30 words).
             Do not use intros like "On this day...". Just the event or fact.
             Make it sound like a ship's log entry.`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            return { text: response.text().trim(), model: modelName };
        }

        try {
            // Attempt user-requested "2.5" (Literal request)
            try {
                return await generate("gemini-2.5-flash");
            } catch (v25Error) {
                console.warn("Gemini 2.5 Flash failed (likely doesn't exist), trying 2.0 Flash Exp...");

                try {
                    return await generate("gemini-2.0-flash-exp");
                } catch (v2Error) {
                    console.warn("Gemini 2.0 Flash Exp failed, trying standard 2.0...");
                    try {
                        return await generate("gemini-2.0-flash");
                    } catch (v2StdError) {
                        console.warn("Gemini 2.0 Flash failed, falling back to 1.5 Flash...");
                        return await generate("gemini-1.5-flash");
                    }
                }
            }
        } catch (flashError) {
            console.warn("Gemini 1.5 Flash failed, attempting fallback to gemini-pro...");
            try {
                return await generate("gemini-pro");
            } catch (proError) {
                console.warn("Gemini Pro failed, attempting fallback to gemini-1.0-pro...");
                return await generate("gemini-1.0-pro");
            }
        }

    } catch (error) {
        console.error("Error fetching fact from Gemini (All models failed):", error);
        return null;
    }
}

// Cache the fact for 12 hours (43200 seconds) to avoid hitting API limits
// and to provide a consistent "Fact of the Day"
export const getDailySpaceFact = unstable_cache(
    async () => {
        const result = await fetchFactFromGemini();

        if (result && result.text) {
            return { text: result.text, source: 'gemini', model: result.model };
        }

        // Fallback deterministic logic
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        return {
            text: FALLBACK_FACTS[dayOfYear % FALLBACK_FACTS.length],
            source: 'archive',
            model: 'static-fallback'
        };
    },
    ["daily-space-fact-v5"], // Bumped version to v5
    { revalidate: 43200 }
);

// DIAGNOSTIC TOOL: Bypass cache and test connection
export async function testGeminiConnection() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { success: false, message: "Server says: GEMINI_API_KEY is missing." };

    try {
        // Step 1: List Models via REST API to verify key permissions and available models
        let availableModelsList = "Unknown";
        try {
            const modelsReq = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const modelsData = await modelsReq.json();

            if (modelsData.error) {
                return { success: false, message: `List Models API Error: ${modelsData.error.message}` };
            }

            if (modelsData.models) {
                availableModelsList = modelsData.models
                    .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
                    .map((m: any) => m.name.replace("models/", ""))
                    .join(", ");
            }
        } catch (listError: any) {
            console.warn("Failed to list models:", listError);
            availableModelsList = "Failed to fetch list (" + listError.message + ")";
        }

        // Step 2: Test Generation with Gemini 2.0 Flash
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        try {
            const result = await model.generateContent("Reply 'OK'");
            const response = await result.response;
            return {
                success: true,
                message: `Success! Gemini 2.0 Flash Exp is working.\nResponse: "${response.text()}"\n\nAvailable Models: ${availableModelsList}`
            };
        } catch (genError: any) {
            // Step 3: If 2.0 fails, try 1.5
            try {
                const model15 = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result15 = await model15.generateContent("Reply 'OK'");
                const response15 = await result15.response;
                return {
                    success: true,
                    message: `Gemini 2.0 Flash FAILED (${genError.message}), but Gemini 1.5 Flash SUCCEEDED.\nResponse: "${response15.text()}"\n\nAvailable Models: ${availableModelsList}`
                };
            } catch (flashError: any) {
                return {
                    success: false,
                    message: `ALL Attempts Failed.\n2.0 Error: ${genError.message}\n1.5 Error: ${flashError.message}\n\nAvailable Models: ${availableModelsList}`
                };
            }
        }
    } catch (e: any) {
        return { success: false, message: "Critical Server Error: " + e.message };
    }
}
