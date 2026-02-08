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
    // DEVELOPER EXPERIENCE FIX: Bypass SSL certificate validation in development or if explicitly skipped
    if (process.env.NODE_ENV === 'development' || process.env.SKIP_SSL_CHECK === 'true') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

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

        // Attempt faster model first, then stronger model
        const models = ["gemini-2.5-flash", "gemini-2.0-flash"];

        for (const modelName of models) {
            try {
                return await generate(modelName);
            } catch (error: any) {
                console.warn(`${modelName} failed:`, error.message);
                continue;
            }
        }

        console.warn("All Gemini models failed. Using fallback.");
        return null;

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
    // Bypass SSL in development for diagnostics too
    if (process.env.NODE_ENV === 'development' || process.env.SKIP_SSL_CHECK === 'true') {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }

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

        // Step 2: Test Generation with Gemini 2.5 Flash
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        try {
            const result = await model.generateContent("Reply 'OK'");
            const response = await result.response;
            return {
                success: true,
                message: `Success! Gemini 2.5 Flash is working.\nResponse: "${response.text()}"\n\nAvailable Models: ${availableModelsList}`
            };
        } catch (genError: any) {
            // Step 3: If 2.5 fails, try 2.0 Flash
            try {
                const model2 = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                const result2 = await model2.generateContent("Reply 'OK'");
                const response2 = await result2.response;
                return {
                    success: true,
                    message: `Gemini 2.5 Flash FAILED (${genError.message}), but Gemini 2.0 Flash SUCCEEDED.\nResponse: "${response2.text()}"\n\nAvailable Models: ${availableModelsList}`
                };
            } catch (flashError: any) {
                return {
                    success: false,
                    message: `ALL Attempts Failed.\n2.5 Error: ${genError.message}\n2.0 Error: ${flashError.message}\n\nAvailable Models: ${availableModelsList}`
                };
            }
        }
    } catch (e: any) {
        return { success: false, message: "Critical Server Error: " + e.message };
    }
}
