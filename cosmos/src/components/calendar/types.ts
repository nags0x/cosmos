export type CelestialEventType = 'moon' | 'eclipse' | 'meteor' | 'planet' | 'launch';

export interface CelestialEvent {
    id: string;
    date: string; // ISO String or YYYY-MM-DD
    title: string;
    description?: string;
    type: CelestialEventType;
    startTime?: string; // Optional time (e.g. "20:00")
    endTime?: string;
    location?: string; // e.g. "Visible from North America"
}
