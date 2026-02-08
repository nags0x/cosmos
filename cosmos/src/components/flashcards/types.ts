export type FlashCardStatus = 'new' | 'learning' | 'mastered';

export interface FlashCardItem {
    id: string;
    front: {
        term: string;
        subtext?: string;
        image?: string;
    };
    back: {
        definition: string;
        nuance?: string; // "Did you know?" or extra context
    };
    status: FlashCardStatus;
}

export interface FlashCardDeckConfig {
    topic: string;
    difficulty: 'beginner' | 'intermediate' | 'expert';
    count: number;
}
