/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { SelectForm, selectFormSchema } from "@/components/tambo/select-form";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { planetSchema } from "@/components/celestials/planetSchema";
import { Planets } from "@/components/celestials/Planets";
import { PlanetGame } from "@/components/celestials/PlanetGame";
import { SpaceQuiz } from "@/components/quiz/SpaceQuiz";
import { SpaceFlashCards } from "@/components/flashcards/SpaceFlashCards";
import { CelestialCalendar } from "@/components/calendar/CelestialCalendar";
import { z } from "zod";
import {
  getSalesData,
  getProducts,
  getUserData,
  getKPIs,
} from "@/services/analytics-data";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "getSalesData",
    description:
      "Get monthly sales revenue and units data. Can filter by region (North, South, East, West) or category (Electronics, Clothing, Home)",
    tool: getSalesData,
    toolSchema: z.function().args(
      z
        .object({
          region: z.string().optional(),
          category: z.string().optional(),
        })
        .default({}),
    ),
  },
  {
    name: "getProducts",
    description:
      "Get top products with sales and revenue information. Can filter by category (Electronics, Furniture, Appliances)",
    tool: getProducts,
    toolSchema: z.function().args(
      z
        .object({
          category: z.string().optional(),
        })
        .default({}),
    ),
  },
  {
    name: "getUserData",
    description:
      "Get monthly user growth and activity data. Can filter by segment (Free, Premium, Enterprise)",
    tool: getUserData,
    toolSchema: z.function().args(
      z
        .object({
          segment: z.string().optional(),
        })
        .default({}),
    ),
  },
  {
    name: "getKPIs",
    description:
      "Get key business performance indicators. Can filter by category (Financial, Growth, Quality, Retention, Marketing)",
    tool: getKPIs,
    toolSchema: z.function().args(
      z
        .object({
          category: z.string().optional(),
        })
        .default({}),
    ),
  },
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "Use this when you want to display a chart. It supports bar, line, and pie charts. When you see data generally use this component. IMPORTANT: When asked to create a graph, always generate it first in the chat - do NOT add it directly to the canvas/dashboard. Let the user decide if they want to add it.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "SelectForm",
    description:
      "ALWAYS use this component instead of listing options as bullet points in text. Whenever you need to ask the user a question and would normally follow up with bullet points or numbered options, use this component instead. For yes/no or single-choice questions, use mode='single'. For questions where the user can select multiple options, use mode='multi' (default). Each group has a label (the question) and options (the choices). Examples: 'Would you like to continue?' with Yes/No options, or 'Which regions interest you?' with multiple region options.",
    component: SelectForm,
    propsSchema: selectFormSchema,
  },
  {
    name: "Planets",
    description:
      "Use this to render a single 3D planet for viewing. Use this when the user asks to 'see' or 'show' a specific planet (e.g. 'Show me Mars').",
    component: Planets,
    propsSchema: planetSchema,
  },
  {
    name: "PlanetGame",
    description: "Use this to start the interactive solar system builder game. The user drags planets from a tray to their orbits. Use this when the user mentions 'game', 'play', 'start', or 'solar system builder'.",
    component: PlanetGame,
    propsSchema: z.object({}),
  },
  {
    name: "SpaceQuiz",
    description: "Use this when the user asks for a 'quiz', 'trivia', or 'test' about space, planets, or the solar system. You can optionally provide a configuration to start a specific quiz immediately.",
    component: SpaceQuiz,
    propsSchema: z.object({
      initialConfig: z.object({
        difficulty: z.enum(['easy', 'medium', 'hard']),
        category: z.string(),
        questionCount: z.number().min(1).max(15)
      }).optional()
    }),
  },
  {
    name: "SpaceFlashCards",
    description: "Use this when the user asks for 'flashcards', 'study mode', or 'learn' about space terms. This tool helps users memorize facts using spaced repetition.",
    component: SpaceFlashCards,
    propsSchema: z.object({
      initialConfig: z.object({
        topic: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'expert']),
        count: z.number().optional()
      }).optional()
    })
  },
  {
    name: "CelestialCalendar",
    description: "Use this when the user asks for a 'calendar', 'schedule', 'events', or dates of celestial phenomena (like full moons, eclipses, meteor showers). It displays a list of events that users can add to their Google Calendar.",
    component: CelestialCalendar,
    propsSchema: z.object({
      title: z.string().optional(),
      initialEvents: z.array(z.object({
        id: z.string(),
        date: z.string().describe("YYYY-MM-DD"),
        title: z.string(),
        description: z.string().optional(),
        type: z.enum(['moon', 'eclipse', 'meteor', 'planet', 'launch']),
        startTime: z.string().optional(),
        endTime: z.string().optional(),
        location: z.string().optional()
      })).optional()
    })
  }
];
