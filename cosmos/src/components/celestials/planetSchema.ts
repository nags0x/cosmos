import { z } from 'zod';

export const planetSchema = z.object({
    object: z.enum(["sun", "planet"]).describe("Type of celestial object"),
    name: z.string().describe("Name of the celestial object (eg: earth, sun"),
    modelPath: z.string().describe("Path to .glb model"),
    scale: z.number().default(1),
    autoHover: z.boolean().default(true),
    allowRotate: z.boolean().default(true),
    correctOrbit: z.string().optional().describe("The name of the orbit where this planet belongs (e.g., 'earth', 'mars')"),
});

export type PlanetProps = z.infer<typeof planetSchema>;

