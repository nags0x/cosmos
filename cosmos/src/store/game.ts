
import { create } from 'zustand';
import { PlanetProps } from '@/components/celestials/planetSchema';

export type OrbitName = string;

interface GameState {
    draggingPlanet: PlanetProps | null;
    placedPlanets: Record<OrbitName, PlanetProps>;

    setDraggingPlanet: (planet: PlanetProps | null) => void;
    placePlanet: (orbitName: OrbitName, planet: PlanetProps) => void;
    resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    draggingPlanet: null,
    placedPlanets: {},

    setDraggingPlanet: (planet) => set({ draggingPlanet: planet }),

    placePlanet: (orbitName, planet) =>
        set((state) => ({
            placedPlanets: {
                ...state.placedPlanets,
                [orbitName]: planet
            }
        })),

    resetGame: () => set({ draggingPlanet: null, placedPlanets: {} })
}));
