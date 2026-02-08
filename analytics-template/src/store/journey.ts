import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JourneyState {
    sessions: number;
    totalTimeMinutes: number;
    topicCounts: Record<string, number>;
    lastActive: number; // timestamp

    incrementSession: () => void;
    addTime: (minutes: number) => void;
    logTopic: (topic: string) => void;

    // Computed (helper for UI)
    getMostExplored: () => string;
    getTopicCount: () => number;
}

export const useJourneyStore = create<JourneyState>()(
    persist(
        (set, get) => ({
            sessions: 0,
            totalTimeMinutes: 0,
            topicCounts: {},
            lastActive: 0,

            incrementSession: () => {
                const now = Date.now();
                const last = get().lastActive;
                // Only count as new session if > 30 mins since last active
                if (now - last > 1800000) {
                    set((state) => ({
                        sessions: state.sessions + 1,
                        lastActive: now
                    }));
                } else {
                    set({ lastActive: now });
                }
            },

            addTime: (minutes) => {
                set((state) => ({
                    totalTimeMinutes: state.totalTimeMinutes + minutes,
                    lastActive: Date.now()
                }));
            },

            logTopic: (topic) => {
                set((state) => {
                    const newCounts = { ...state.topicCounts };
                    newCounts[topic] = (newCounts[topic] || 0) + 1;
                    return {
                        topicCounts: newCounts,
                        lastActive: Date.now()
                    };
                });
            },

            getMostExplored: () => {
                const counts = get().topicCounts;
                let max = 0;
                let best = "Cosmos";

                Object.entries(counts).forEach(([topic, count]) => {
                    if (count > max) {
                        max = count;
                        best = topic;
                    }
                });

                if (max === 0) return "Not yet started";
                return best;
            },

            getTopicCount: () => {
                return Object.keys(get().topicCounts).length;
            }
        }),
        {
            name: 'cosmic-journey-storage',
        }
    )
);
