"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlashCardItem, FlashCardDeckConfig } from "./types";
import { FlashCard } from "./FlashCard";
import { Layers, Trophy, RefreshCw } from "lucide-react";

// Mock AI Data Generator
const MOCK_FLASHCARDS: FlashCardItem[] = [
    {
        id: "fc-1",
        front: { term: "Light Year", subtext: "Distance Measurement", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=200" },
        back: { definition: "The distance light travels in one year—about 5.88 trillion miles (9.46 trillion km).", nuance: "It measures distance, not time!" },
        status: "new"
    },
    {
        id: "fc-2",
        front: { term: "Nebula", subtext: "Cosmic Cloud" },
        back: { definition: "A giant cloud of dust and gas in space. Some come from the gas and dust thrown out by the explosion of a dying star, such as a supernova.", nuance: "Detailed images of nebulae are often colored falsely to show chemical composition." },
        status: "new"
    },
    {
        id: "fc-3",
        front: { term: "Event Horizon", subtext: "Black Hole Boundary" },
        back: { definition: "The boundary around a black hole beyond which no light or other radiation can escape.", nuance: "Also known as the 'point of no return'." },
        status: "new"
    },
    {
        id: "fc-4",
        front: { term: "Exoplanet", subtext: "Planetary Science" },
        back: { definition: "A planet outside our solar system.", nuance: "Confirmed exoplanets now number in the thousands." },
        status: "new"
    },
    {
        id: "fc-5",
        front: { term: "Supernova", subtext: "Stellar Event" },
        back: { definition: "A powerful and luminous stellar explosion.", nuance: "Can briefly outshine an entire galaxy." },
        status: "new"
    }
];

interface FlashCardDeckProps {
    initialConfig?: FlashCardDeckConfig;
}

export function FlashCardDeck({ initialConfig }: FlashCardDeckProps) {
    const [deck, setDeck] = useState<FlashCardItem[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [masteredCount, setMasteredCount] = useState(0);
    const [sessionComplete, setSessionComplete] = useState(false);

    useEffect(() => {
        // Simulate loading/AI generation based on config
        // For now, load mock data
        const timer = setTimeout(() => {
            setDeck([...MOCK_FLASHCARDS]);
        }, 0);
        return () => clearTimeout(timer);
    }, [initialConfig]);

    const handleResult = (result: 'review' | 'mastered') => {
        setIsFlipped(false);

        // Wait for flip back animation
        setTimeout(() => {
            if (result === 'mastered') {
                setMasteredCount(prev => prev + 1);
                // Move to next card
                if (currentCardIndex + 1 < deck.length) {
                    setCurrentCardIndex(prev => prev + 1);
                } else {
                    setSessionComplete(true);
                }
            } else {
                // Re-queue logic: Move this card to the end of the current session or keep it?
                // Simple "Show Again" logic: Move to end of array so it appears again
                const currentCard = deck[currentCardIndex];
                const newDeck = [...deck];
                newDeck.push({ ...currentCard, id: currentCard.id + '-retry' }); // Clone to end
                setDeck(newDeck);

                // Move to next card
                if (currentCardIndex + 1 < newDeck.length) {
                    setCurrentCardIndex(prev => prev + 1);
                }
            }
        }, 300);
    };

    const handleRestart = () => {
        setDeck([...MOCK_FLASHCARDS]);
        setCurrentCardIndex(0);
        setMasteredCount(0);
        setSessionComplete(false);
        setIsFlipped(false);
    }

    if (deck.length === 0) return <div>Loading Transmission...</div>;

    if (sessionComplete) {
        return (
            <div className="w-full max-w-md mx-auto bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center p-1 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                        <Trophy className="w-10 h-10 text-white" fill="white" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-white">Training Complete</h2>
                <p className="text-slate-400">You have reviewed all cards in this module.</p>
                <button
                    onClick={handleRestart}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Restart Session</span>
                </button>
            </div>
        )
    }

    const currentCard = deck[currentCardIndex];
    const progress = Math.min(100, (masteredCount / MOCK_FLASHCARDS.length) * 100);

    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            {/* Header / Progress */}
            <div className="flex items-center justify-between text-slate-400 text-sm font-medium px-2">
                <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Card {currentCardIndex + 1} of {deck.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-emerald-400">{masteredCount} Mastered</span>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
                <FlashCard
                    key={currentCard.id}
                    card={currentCard}
                    isFlipped={isFlipped}
                    onFlip={() => setIsFlipped(!isFlipped)}
                    onResult={handleResult}
                />
            </AnimatePresence>
        </div>
    );
}
