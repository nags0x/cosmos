"use client";

import { useEffect, useRef } from "react";
import { useTambo } from "@tambo-ai/react";
import { useJourneyStore } from "@/store/journey";

export function JourneyLogger() {
    const { thread } = useTambo();
    const { incrementSession, addTime, logTopic } = useJourneyStore();
    const messagesLengthRef = useRef(0);

    // Track session start on mount
    useEffect(() => {
        incrementSession();

        // Timer for engagement (simple 1 min interval when active)
        const timer = setInterval(() => {
            if (document.visibilityState === 'visible') {
                addTime(1);
            }
        }, 60000);

        return () => clearInterval(timer);
    }, [incrementSession, addTime]);

    // Track new messages to infer topics
    useEffect(() => {
        if (!thread?.messages) return;

        const newMessages = thread.messages.slice(messagesLengthRef.current);
        messagesLengthRef.current = thread.messages.length;

        newMessages.forEach(msg => {
            if (msg.role === 'assistant') {
                // Infer topic from tool calls or simple keyword matching
                // In a real app, the LLM could tag the topic explicitly

                if (msg.toolCallRequest) {
                    const tool = msg.toolCallRequest.toolName;
                    if (tool.includes('Planet')) logTopic('Planetary Science');
                    if (tool.includes('Quiz')) logTopic('Astronomy');
                    if (tool.includes('Calendar')) logTopic('Celestial Events');
                    if (tool.includes('FlashCards')) logTopic('Exobiology');
                }

                // Fallback keyword matching
                const content = typeof msg.content === 'string' ? msg.content : "";
                if (content.match(/mars|jupiter|saturn|venus/i)) logTopic('Planets');
                if (content.match(/star|sun|nebula/i)) logTopic('Stellar Physics');
                if (content.match(/moon|orbit|crater/i)) logTopic('Moons');
            }
        });

    }, [thread?.messages, logTopic]);

    return null; // Headless component
}
