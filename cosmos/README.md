# AI-Driven Planet Placement Game (Tambo Hack)

**Planets: An Interactive 3D Learning Game**

We’re building an **interactive learning game** where an AI (via Tambo chat) generates planets, and the user must **place them into the correct orbit** around a sun.

## High-level Idea

The core mechanic is:
1.  **AI introduces a planet** (e.g. *Earth*)
2.  **User drags the planet** from a tray
3.  **User drops it into the correct orbit**
4.  **System validates correctness** and gives feedback

This turns a chat interaction into a **spatial, hands-on learning experience** instead of static text.

## Tech Stack & Architecture

*   **Next.js + TypeScript**
*   **React Three Fiber (R3F)** for 3D
*   **@react-three/drei** for helpers
*   **Zod** for schema validation
*   **Tambo** for AI-controlled UI rendering
*   **Zustand** for shared game state

**Central Design Principle:**
> **AI decides *what* appears, code decides *how* it behaves**

## Core Components

### 1. Planet Tray
A "palette" looking 3D container showing miniature planets tailored for selection.

### 2. Orbit Board
The main game board with the Sun and concentric orbit rings. This is where the drag-and-drop validation logic lives.

## Developer Setup

1.  `npm install`
2.  `npx tambo init` (if not already configured)
3.  `npm run dev`

## Context
This project was initialized from `tambo-analytics-template` but has been repurposed for the **Tambo Hack**.
