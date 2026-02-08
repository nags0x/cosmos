declare module 'lune' {
    export interface MoonPhaseInfo {
        phase: number;
        illuminated: number;
        age: number;
        distance: number;
        angular_diameter: number;
        sun_distance: number;
        sun_angular_diameter: number;
    }

    export interface PhaseHunt {
        new_date: Date;
        q1_date: Date;
        full_date: Date;
        q3_date: Date;
        nextnew_date: Date;
    }

    export function phase(date?: Date): MoonPhaseInfo;
    export function phase_hunt(date?: Date): PhaseHunt;
}
