# Life Systems Hub

A dark-mode-only personal RPG dashboard that gamifies life tracking. Built with React + Vite + Tailwind CSS v4, using the [sw-design-system](https://github.com/seanwinslow28/sw-design-system) shared design foundation.

> "You are the main character." Opening this should feel like loading your save file — energized, motivated, ready to play.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| **Hub** | `/` | Character screen — XP bar, today's quests, streak, quick stats |
| **Finances** | `/finances` | CSV import, budget gauges, spending chart, transaction table |
| **Fitness** | `/fitness` | PPL split weekly view, workout log, Apple Health placeholder |
| **Habits** | `/habits` | Weekly tracker grid, habit streaks, add habit form |
| **Vault** | `/vault` | Obsidian vault stats, Maps of Content, integration placeholder |
| **Settings** | `/settings` | Placeholder for future settings |

## Gamification System

### XP Levels
| Level | Title | Cumulative XP |
|-------|-------|---------------|
| 1 | Recruit | 0 |
| 2 | Apprentice | 500 |
| 3 | Specialist | 1,700 |
| 4 | Veteran | 4,200 |
| 5 | Elite | 8,200 |
| 6 | Champion | 14,200 |
| 7 | Master | 22,700 |
| 8 | Grandmaster | 34,700 |
| 9 | Legend | 50,700 |
| 10 | Immortal | 75,700 |

### XP Sources
- Habit completed: +25 XP
- Workout logged: +50 XP
- Daily streak bonus: +10 XP per day of streak
- Weekly review: +100 XP
- Financial check-in: +30 XP

### Streak Multipliers
- Days 1-7: 1x
- Days 8-14: 1.5x
- Days 15-30: 2x
- Days 31+: 3x

## Tech Stack

- **React 18** + **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **React Router v7** (HashRouter for static hosting)
- **Recharts** for data visualization
- **sw-design-system** tokens and components

## Design System

Uses the shared `sw-design-system` design tokens:
- **Colors**: Blue (#3B82F6) primary, Orange (#F97316) accent — 80/20 ratio
- **Surfaces**: #09090B → #18181B → #27272A → #3F3F46
- **Typography**: Inter (body/UI), JetBrains Mono (data/numbers)
- **Spacing**: 4px base unit
- **Border Radius**: 6px buttons, 8px dashboard cards

## Setup

```bash
# Clone the repo
git clone https://github.com/seanwinslow28/life-systems-hub.git
cd life-systems-hub

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
life-systems-hub/
├── src/
│   ├── components/       # Shared UI components
│   │   ├── Card.jsx
│   │   ├── MetricCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Toast.jsx
│   │   └── XPBar.jsx
│   ├── pages/            # Route pages
│   │   ├── HubPage.jsx
│   │   ├── FinancesPage.jsx
│   │   ├── FitnessPage.jsx
│   │   ├── HabitsPage.jsx
│   │   ├── VaultPage.jsx
│   │   └── SettingsPage.jsx
│   ├── data.js           # All mock data (ready for IndexedDB migration)
│   ├── tokens.css        # Design tokens from sw-design-system
│   ├── index.css         # App-level styles and animations
│   ├── App.jsx           # Router and layout
│   └── main.jsx          # Entry point
├── vite.config.js
├── package.json
└── README.md
```

## Data Architecture

All mock data lives in `src/data.js` — structured for easy migration to IndexedDB + Dexie.js:
- `XP_LEVELS` — Level progression table
- `XP_SOURCES` — XP reward values
- `USER_PROFILE` — Current user state
- `HABITS_TODAY` / `HABITS_LIST` / `HABIT_WEEK_GRID` — Habit tracking data
- `WORKOUT_WEEK` — PPL split workout log
- `FINANCIAL_SUMMARY` / `TRANSACTIONS` — Financial data
- `VAULT_STATS` / `VAULT_MOCS` — Obsidian vault data
- `importCSV()` / `syncAppleHealth()` / `connectVault()` — Placeholder hooks

## Future Integrations

- **IndexedDB + Dexie.js** — Persistent local storage for all data
- **PapaParse** — CSV parsing for Chase/Bilt bank imports
- **Apple Health** — HealthKit web API for workout sync
- **Obsidian Local REST API** — Vault stats and note counts
- **Claude Code** — Automation hooks via MCP

## Design Philosophy

The gamification is built into the **system** (XP, levels, streaks, quests), not the visual chrome. No pixel fonts, no 8-bit borders, no retro UI elements. The game layer is warm and rewarding without being loud. Opening this at 5am should feel energizing, not overwhelming.
