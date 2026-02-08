"use server";

import fs from "fs/promises";
import path from "path";

export interface Skill {
    id: string;
    name: string;
    description: string;
    version?: string;
    path: string;
    content?: string; // Full content for the viewer
}

const SKILLS_DIR = path.join(process.cwd(), ".agents/skills");

export async function getSkills(): Promise<Skill[]> {
    try {
        // Check if directory exists
        try {
            await fs.access(SKILLS_DIR);
        } catch {
            return [];
        }

        const entries = await fs.readdir(SKILLS_DIR, { withFileTypes: true });
        const directories = entries.filter((entry) => entry.isDirectory());

        const skills: Skill[] = await Promise.all(
            directories.map(async (dir) => {
                const agentPath = path.join(SKILLS_DIR, dir.name, "AGENTS.md");
                let description = "No description available.";
                let name = dir.name;
                let version = "0.0.0";
                let content = "";

                try {
                    content = await fs.readFile(agentPath, "utf-8");
                    // Simple parsing logic
                    const lines = content.split('\n');
                    const titleLine = lines.find(line => line.startsWith('# '));
                    if (titleLine) name = titleLine.replace('# ', '').trim();

                    const versionLine = lines.find(line => line.includes('Version'));
                    if (versionLine) version = versionLine.replace(/\*\*/g, '').replace('Version', '').trim();

                    // Find abstract or description
                    const abstractIndex = lines.findIndex(line => line.includes('## Abstract'));
                    if (abstractIndex !== -1) {
                        for (let i = abstractIndex + 1; i < lines.length; i++) {
                            if (lines[i].trim().length > 0 && !lines[i].startsWith('#')) {
                                description = lines[i].trim();
                                break;
                            }
                        }
                    }

                } catch (e) {
                    console.warn(`Could not read AGENTS.md for ${dir.name}`, e);
                }

                return {
                    id: dir.name,
                    name,
                    description,
                    version,
                    path: `/skills/${dir.name}`,
                    content
                };
            })
        );

        return skills;
    } catch (error) {
        console.error("Error reading skills directory:", error);
        return [];
    }
}
