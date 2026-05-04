# Wonderlust

A modern, glassmorphism travel app built with Next.js, Three.js, and Supabase.

## Features

- 3D interactive globe with clickable destination pins
- Travel Log dashboard with continent checklist and coverage chart
- Supabase magic-link auth + user-scoped data model
- Aurora Glass design system with smooth, restrained motion
- Responsive layouts for mobile, tablet, desktop

## Setup

1. Install dependencies:
   `npm install`
2. Copy env:
   `copy .env.example .env.local`
3. Add your Supabase project values in `.env.local`.
4. Run app:
   `npm run dev`

## Database

- SQL migration: `supabase/migrations/20260505_init_wonderlust.sql`
- Includes core tables, `travel_stats` view, and RLS policies.

## Tests

- Unit + component tests:
  `npm run test`
