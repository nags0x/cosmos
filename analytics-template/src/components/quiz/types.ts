export type QuizDifficulty = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string; // The correct option string
    funFact: string;
    type?: 'mcq' | 'true-false'; // extensible
    image?: string; // Optional image URL
}

export interface QuizConfig {
    difficulty: QuizDifficulty;
    category: string;
    questionCount: number;
}

export interface QuizResult {
    score: number;
    total: number;
    rating: number; // 0-5
    summary: string;
}
