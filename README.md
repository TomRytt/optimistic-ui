# Optimistic UI Demo

Interactive demonstration of Optimistic UI patterns using React 19, built with a Pokemon-catching theme.

## Quick Start

```bash
# Install dependencies
npm run install:all

# Run both server and client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## The Demos

**Demo 1: Traditional** - User waits for server response (shows the problem)

**Demo 2: Optimistic (Basic)** - Instant feedback, but jarring rollback on pokeball failures

**Demo 3: React 19 Hooks** - Smooth UX with `useOptimistic` + `useTransition` (production-ready)

**Demo 4: Custom Hook** - DIY implementation with race condition protection

## Tech Stack

- React 19 + TypeScript
- Express backend
- Vite + CSS Modules

## Features

- Configurable delay (1-3 seconds)
- Two ball types: Pokeball (50% success) and Master Ball (100% success)
- Progressive complexity across 4 demos

---

Built for teaching Optimistic UI patterns at Frontend Meetups
