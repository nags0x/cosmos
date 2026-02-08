"use client";

import { FlashCardDeckConfig } from "./types";
import { FlashCardDeck } from "./FlashCardDeck";

interface SpaceFlashCardsProps {
    initialConfig?: FlashCardDeckConfig;
}

export function SpaceFlashCards({ initialConfig }: SpaceFlashCardsProps) {
    return (
        <div className="w-full min-h-[500px] flex flex-col items-center justify-center p-4">
            <FlashCardDeck initialConfig={initialConfig} />
        </div>
    );
}
