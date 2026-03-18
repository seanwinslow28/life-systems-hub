# CLAUDE.md -- Life Systems Hub

## Read First

- **`DESIGN-SPEC.md`** is the single source of truth for all visual decisions. Read it before building any UI.
- **`docs/`** has component mini-specs: `XPBar.md`, `HabitRow.md`, `MetricCard.md`.

## Project Overview

| | |
|---|---|
| **Framework** | React + Vite + Tailwind v4 |
| **Mode** | Dark mode only. Always. |
| **Audience** | Sean only (personal dashboard) |
| **Philosophy** | "Your save file, loaded" -- shadcn/ui precision + RPG gamification warmth |

## Non-Negotiable Rules

1. **No pure black (#000000) as background.** Surface-0 is `#09090B`.
2. **No loading spinners.** Use illustrated loading states.
3. **No emoji in UI.** Lucide icons only.
4. **Every animation respects `prefers-reduced-motion`.** No exceptions.
5. **Border radius:** 6px buttons/inputs, 8px dashboard cards. Never pill-shaped (exception: streak multiplier badge at 999px).
6. **GPU-only animations.** Only animate `transform` and `opacity`. Never animate height, width, or margin.
7. **Icon library:** Lucide via `lucide-react`. 16px inline, 20px default, 24px hero.
8. **Spacing:** 4px base unit, shared token scale (space-1 through space-16).
9. **Error voice:** Calm, diagnostic, factual. No apologetic language, no humor.
10. **Form validation:** On submit only. No blur validation, no real-time validation.

## Color

| Role | Value |
|------|-------|
| **Primary (Blue)** | `#3B82F6` |
| **Secondary (Orange)** | `#F97316` |
| **Ratio** | 80% blue / 20% orange |

## Typography

| Role | Font | Weights | Notes |
|------|------|---------|-------|
| **Headings** | Inter | 600 | Inter only for headings |
| **Body** | Inter | 400, 500 | |
| **Monospace** | JetBrains Mono | 400, 500 | Tables, chart axes, XP counters only |

**Important:** Budget headline values use Inter (not JetBrains Mono). Mono is only for tables, chart axes, and XP/stat counters per spec.

## Architecture

- **React + Vite + Tailwind v4** -- uses `@theme` directive in CSS, no `tailwind.config.js`
- **`data-theme="dark"`** set on `<html>` and enforced in `main.jsx`
- **Design tokens** in `tokens.css` (shared) and `app.css` (project-specific)
- **Components** in `src/design-system/components/` use `React.createElement` style (no JSX in component lib)
- **Pages** use JSX syntax
- **Mock data** in `src/data.js`
- **Charts:** Recharts (`AreaChart`, not `LineChart`)
- **Sidebar:** Custom-built in `App.jsx` (not using design system's Sidebar) because it needs react-router `<Link>`
- **StatusBadge** component handles running/completed/attention/failed -- disabled is handled inline
- **lucide-react** installed

## Key Decisions (Completed Work)

These decisions were made during Phase 5 and should be maintained:

- **XPBar:** 32x32 level badge, 8px bar height, level-up celebration sequence, JetBrains Mono XP counter
- **Habit feedback:** Inline "+25 XP -- Habit Name" (NOT toast). 200ms fade-in / 2.5s hold / 300ms fade-out timing
- **Streak:** Lucide `Flame` icon, orange number, 999px pill multiplier badge
- **Hero MetricCard:** "Current Streak" (h2, span-2 columns, `Flame` icon 24px)
- **Sidebar:** All lucide-react icons at 20px, profile section reads `USER_PROFILE` dynamically
- **Greeting:** 4 time brackets with context lines (dawn/morning/afternoon/evening)
- **Fitness:** `Moon` icon for rest days, formal "Coming Soon" pattern
- **Chart:** JetBrains Mono axes, tooltip with shadow, blue/orange bars
- **Removed "XP Today" + "Streak" standard cards** -- hero streak card spans 2 cols, kept Workouts + Budget
- **`Zap` icon** for "Today's Quests" header, `Dumbbell`/`Wallet` for metric cards

## Before Building Any UI

1. Read `DESIGN-SPEC.md`
2. Check `docs/` for component mini-specs (XPBar, HabitRow, MetricCard)
3. After building, verify against the spec
