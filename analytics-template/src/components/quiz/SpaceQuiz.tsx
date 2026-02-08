"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { QuizConfig, QuizQuestion, QuizResult } from "./types";
import { QuizSetupCard } from "./QuizSetupCard";
import { QuizQuestionCard } from "./QuizQuestionCard";
import { QuizFeedbackCard } from "./QuizFeedbackCard";
import { QuizScoreCard } from "./QuizScoreCard";

// Mock Data Generator (In real app, this comes from AI)
const MOCK_QUESTIONS: Record<string, QuizQuestion[]> = {
    default: [
        {
            id: "1",
            question: "Which planet has the most moons in our solar system?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correctAnswer: "Saturn",
            funFact: "Saturn has 146 confirmed moons, overtaking Jupiter's 95!",
            image: "https://images.unsplash.com/photo-1614730341194-75c607ae97ed?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "2",
            question: "What is the Great Red Spot on Jupiter?",
            options: ["A crater", "A volcano", "A storm", "A lake"],
            correctAnswer: "A storm",
            funFact: "It is a giant storm bigger than Earth that has been raging for hundreds of years.",
            image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=600"
        },
        {
            id: "3",
            question: "Which planet is known as the 'Red Planet'?",
            options: ["Venus", "Mars", "Mercury", "Jupiter"],
            correctAnswer: "Mars",
            funFact: "Mars appears red due to iron oxide (rust) on its surface.",
        },
        {
            id: "4",
            question: "What is the hottest planet in our solar system?",
            options: ["Mercury", "Venus", "Mars", "Jupiter"],
            correctAnswer: "Venus",
            funFact: "Even though Mercury is closer to the Sun, Venus is hotter due to its thick atmosphere trapping heat.",
        },
        {
            id: "5",
            question: "Which planet has beautiful rings visible from Earth?",
            options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
            correctAnswer: "Saturn",
            funFact: "While other giant planets have rings, Saturn's are the only ones easily visible from Earth.",
        }
    ]
};

type GameState = 'setup' | 'playing' | 'feedback' | 'finished';

interface SpaceQuizProps {
    initialConfig?: QuizConfig;
}

export function SpaceQuiz({ initialConfig }: SpaceQuizProps) {
    const [gameState, setGameState] = useState<GameState>(initialConfig ? 'playing' : 'setup');
    const [_, setConfig] = useState<QuizConfig | null>(initialConfig || null);
    const [questions, setQuestions] = useState<QuizQuestion[]>(
        initialConfig
            ? MOCK_QUESTIONS.default.slice(0, initialConfig.questionCount)
            : []
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lastCorrect, setLastCorrect] = useState(false);

    const handleStart = (newConfig: QuizConfig) => {
        setConfig(newConfig);
        // Simulate AI loading/fetching
        // For now, slice mock questions based on count, or repeat them if needed
        const selectedQuestions = MOCK_QUESTIONS.default.slice(0, newConfig.questionCount);
        setQuestions(selectedQuestions);
        setScore(0);
        setCurrentIndex(0);
        setGameState('playing');
    };

    const handleAnswer = (answer: string) => {
        const currentQ = questions[currentIndex];
        const isCorrect = answer === currentQ.correctAnswer;

        if (isCorrect) {
            setScore(s => s + 1);
        }
        setLastCorrect(isCorrect);
        setGameState('feedback');
    };

    const handleNext = () => {
        if (currentIndex + 1 >= questions.length) {
            setGameState('finished');
        } else {
            setCurrentIndex(prev => prev + 1);
            setGameState('playing');
        }
    };

    const handleRestart = () => {
        setGameState('setup');
        setScore(0);
        setCurrentIndex(0);
    };

    // Helper to calculate stars
    const getRating = (score: number, total: number) => {
        const percentage = score / total;
        if (percentage === 1) return 5;
        if (percentage >= 0.8) return 4;
        if (percentage >= 0.6) return 3;
        if (percentage >= 0.4) return 2;
        return 1;
    }

    const getSummary = (score: number, total: number) => {
        const percentage = score / total;
        if (percentage === 1) return "Flawless Mission! You're a certified astronaut.";
        if (percentage >= 0.8) return "Excellent work, cadet! Nearly perfect.";
        if (percentage >= 0.5) return "Good job! But space is unforgiving, keep training.";
        return "Mission aborted. Back to flight school!";
    }

    return (
        <div className="w-full min-h-[600px] flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {gameState === 'setup' && (
                    <QuizSetupCard key="setup" onStart={handleStart} />
                )}

                {gameState === 'playing' && questions[currentIndex] && (
                    <QuizQuestionCard
                        key="question"
                        question={questions[currentIndex]}
                        onAnswer={handleAnswer}
                        currentQuestionIndex={currentIndex}
                        totalQuestions={questions.length}
                    />
                )}

                {gameState === 'feedback' && questions[currentIndex] && (
                    <QuizFeedbackCard
                        key="feedback"
                        isCorrect={lastCorrect}
                        correctAnswer={questions[currentIndex].correctAnswer}
                        funFact={questions[currentIndex].funFact}
                        onNext={handleNext}
                    />
                )}

                {gameState === 'finished' && (
                    <QuizScoreCard
                        key="score"
                        result={{
                            score,
                            total: questions.length,
                            rating: getRating(score, questions.length),
                            summary: getSummary(score, questions.length)
                        }}
                        onRestart={handleRestart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
