# Life Systems Hub — Design Specification

> **Version:** 2.0
> **Date:** March 12, 2026
> **Scope:** This spec governs all design decisions for the Life Systems Hub (`life-systems-hub/`). It is self-contained — read this file and nothing else before building.

---

## 1. Design Philosophy

**"Your save file, loaded."**

The Life Systems Hub is a personal RPG dashboard that gamifies daily life. Opening it at 5am should feel like loading your save file — energized, motivated, ready to play. The visual foundation is **shadcn/ui's precision** (clean cards, subtle borders, excellent dark mode) layered with **RPG warmth** (XP bars, level-up celebrations, streak rewards).

The gamification is in the *system*, not the decoration. Game-like elements (XP bar, level badge, streak counter) have more visual weight than standard UI — they're the *point*. But the underlying component quality is engineering-grade.

**Mode:** Dark mode only. Always.

---

## 2. Shared Foundations

These fundamentals are consistent across all Sean Winslow projects.

### Spacing System

**4px base unit.** All spacing derives from multiples of 4px.

| Token | Value | Common Use |
|-------|-------|------------|
| `--space-1` | 4px | Tight internal padding (badge padding) |
| `--space-2` | 8px | Icon gaps, compact element spacing |
| `--space-3` | 12px | Default internal padding |
| `--space-4` | 16px | Standard element spacing |
| `--space-5` | 20px | Card internal padding |
| `--space-6` | 24px | Section padding, card gaps |
| `--space-8` | 32px | Major section gaps |
| `--space-10` | 40px | Large section dividers |
| `--space-12` | 48px | Page section spacing |
| `--space-16` | 64px | Hero spacing, major section breaks |

### Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `--bp-mobile` | 640px | Mobile devices |
| `--bp-tablet` | 768px | Tablets |
| `--bp-desktop` | 1024px | Desktop |
| `--bp-wide` | 1280px | Wide screens |

### Accessibility (Non-Negotiable)

- WCAG AA contrast ratios minimum on all text.
- All interactive elements have visible focus indicators: `2px solid var(--color-primary)` with `2px offset`.
- Keyboard navigation support on all interactive elements.
- Minimum `44x44px` touch targets on mobile.
- **Mandatory reduced-motion kill switch:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Motion Principles

- **Max transition duration:** 400ms. Nothing longer.
- **Micro-interactions (hover, focus):** 150–200ms.
- **Easing:** `ease-out` for entrances, `ease-in` for exits, `ease-in-out` for state changes.
- **GPU-only properties:** Only animate `transform` and `opacity`. Never animate `height`, `width`, or `margin`.

### Icon Library: Lucide

All icons use **Lucide** ([lucide.dev](https://lucide.dev)) via the `lucide-react` package.

| Token | Size | Usage |
|-------|------|-------|
| `--icon-sm` | 16px | Inline with text (badges, status indicators, metadata) |
| `--icon-md` | 20px | Default. Sidebar navigation, buttons, card actions |
| `--icon-lg` | 24px | Page headers, standalone icon buttons, metric card icons |

**Rules:**
- Stroke only (Lucide default outline style, 2px stroke weight).
- No decorative icons — every icon serves a functional purpose.
- Consistent metaphors — once an icon is assigned to a concept, that mapping is fixed.

**Icon Assignments:**
| Concept | Icon | Size |
|---------|------|------|
| Hub/Home | `Home` | 20px |
| Habits | `CheckSquare` | 20px |
| Fitness | `Dumbbell` | 20px |
| Finances | `Wallet` | 20px |
| Vault | `Archive` | 20px |
| Settings | `Settings` | 20px |
| Today's Quests | `Zap` | 20px |
| Streak | `Flame` | 16px/20px |

### Font Loading

Google Fonts — Inter, JetBrains Mono. Use `font-display: swap` and preload critical fonts.

### No Emoji

Emoji are never used in UI — not in copy, not in toasts, not in status labels, not in navigation. Use Lucide icons for visual accents.

### Micro-Copy Consistency

| Pattern | Rule | Example |
|---------|------|---------|
| Dates | Always ISO-ish: "Mar 3, 2026" | Not "3/3/26" or "March 3rd, 2026" |
| Times | 12-hour with am/pm, no space | "6:00am" not "6:00 AM" or "18:00" |
| Currency | Dollar sign, no space, 2 decimals | "$0.12" not "$ 0.12" or "$0.1" |
| Duration | Compact: "2m 5s" or "45s" | Not "2 minutes and 5 seconds" |
| Relative time | Use within last 24h: "3 hours ago" | Beyond 24h: absolute date |
| XP values | Plus sign, space, "XP" uppercase | "+50 XP" not "+50xp" or "50 XP" |
| Percentages | No space before % | "33%" not "33 %" |

### Form Validation Timing

All form validation triggers **on submit**. No validation on blur, no real-time validation.

| Behavior | Spec |
|---------|------|
| Trigger | Validation runs when submit button is clicked. All errors appear at once. |
| Error display | All invalid fields show errors simultaneously. First invalid field receives focus. |
| Error clearing | Field error clears when user modifies that field's value (on `input` event). |
| Invalid field styling | Border color transitions to `--color-error` at `150ms ease`. Error text beneath field fades in at `150ms`. |
| Submit button | Always enabled. No disabled state based on validation. |

---

## 3. Color System

### Visual Foundation

The surface hierarchy uses **shadcn/ui's zinc-based dark palette** — the same neutrals used by shadcn, Linear, and Vercel. This provides a clean, modern dark mode foundation.

### Dark Mode Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-0` | `#09090B` | App background (near-black, NOT pure black) |
| `--surface-1` | `#18181B` | Cards, sidebar background |
| `--surface-2` | `#27272A` | Elevated cards, dropdowns, modals |
| `--surface-3` | `#3F3F46` | Borders, dividers, subtle separators |
| `--text-primary` | `#FAFAFA` | Primary text |
| `--text-secondary` | `#A1A1AA` | Secondary/muted text |
| `--text-tertiary` | `#71717A` | Placeholder text, disabled states |

### Accent Colors

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Primary Blue | `--color-primary` | `#3B82F6` | Links, active states, primary buttons, XP bar, progress, data |
| Primary Blue Muted | `--color-primary-muted` | `#60A5FA` | Hover states, secondary emphasis |
| Accent Orange | `--color-accent` | `#F97316` | CTAs, celebrations, streak highlights, attention signals |
| Accent Orange Muted | `--color-accent-muted` | `#FB923C` | Hover states on accent elements |

### Semantic Colors

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Success | `--color-success` | `#22C55E` | Habit completed, positive trends |
| Warning | `--color-warning` | `#F97316` | Maps to accent orange |
| Error | `--color-error` | `#EF4444` | Critical alerts |
| Info | `--color-info` | `#3B82F6` | Maps to primary blue |

### Usage Ratio: 80/20 Blue/Orange

- **Blue: ~80% of accent usage.** XP bar, progress fills, links, selections, active states, data lines.
- **Orange: ~20% of accent usage.** Streak highlights, level-up celebrations, CTAs, multiplier badges. Never use them at equal weight.

---

## 4. Typography

### Font Stack

| Role | Font | Weight Range |
|------|------|--------------|
| Everything UI | **Inter** | 400 (Regular), 500 (Medium), 600 (SemiBold) |
| Monospace | **JetBrains Mono** | 400 (Regular), 500 (Medium) |

**No Sora.** Sora is the portfolio's signature font. This project uses Inter exclusively for all headings and body text, consistent with shadcn/ui's default.

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `--text-h1` | 36px / 2.25rem | 1.2 | Page titles |
| `--text-h2` | 28px / 1.75rem | 1.3 | Section headings, hero metric values |
| `--text-h3` | 22px / 1.375rem | 1.4 | Subsection headings |
| `--text-h4` | 18px / 1.125rem | 1.4 | Card titles, labels |
| `--text-body` | 16px / 1rem | 1.6 | Body text |
| `--text-small` | 14px / 0.875rem | 1.5 | Metadata, captions, secondary info |
| `--text-caption` | 12px / 0.75rem | 1.4 | Labels, badges, timestamps |
| `--text-mono` | 14px / 0.875rem | 1.6 | Data values, chart axes |

### Font Weight Rules

- **Headings:** Inter SemiBold 600.
- **Body:** Inter Regular 400. Medium 500 for inline emphasis.
- **Monospace:** JetBrains Mono Regular 400. Medium 500 for highlighted entries.
- **Never use font weights below 400.**

### Financial Typography: Headline/Detail Split

| Context | Font | Example |
|---------|------|---------|
| **Summary/headline metrics** | Inter SemiBold 600, `--text-h2` or `--text-h3` | The large "$1,247" budget figure on a MetricCard |
| **Detail tables and rows** | JetBrains Mono Regular 400, `--text-small` (14px) | "$12.50", "$312 / $400" |
| **Chart axis values** | JetBrains Mono Regular 400, `--text-caption` (12px) | Y-axis: "$200", "$400" |
| **Chart tooltip values** | JetBrains Mono Regular 400, `--text-small` (14px) | "Mar 3: $47.20" |
| **Inline body references** | Inter Regular 400 (matches surrounding text) | "You've spent $312 of your $400 budget" |

**Rule:** Numbers in data-dense contexts (tables, charts, logs) use JetBrains Mono. Headlines, summaries, and prose use Inter.

---

## 5. Layout & Grid

### Structure: Hub and Spoke

- **Hub = Character Screen** (`/`). Landing page: profile, level, XP bar, today's quests, streak, summary stats.
- **Spokes (via sidebar):**
  - Finances (`/finances`) — CSV import, spending charts, transaction table, budget gauge
  - Fitness (`/fitness`) — PPL weekly split, workout log, Apple Watch placeholder
  - Habits (`/habits`) — Weekly tracker grid, XP rewards, streak tracking
  - Vault (`/vault`) — Obsidian vault visualization placeholder

### Dashboard Layout

- **Sidebar width:** 240px (expanded), 64px (collapsed/icon-only)
- **Main content area:** Fluid, fills remaining space
- **Card grid:** CSS Grid, `auto-fill`, `minmax(320px, 1fr)`
- **Max content width:** None (dashboards use full viewport)

### Information Density

Comfortable-to-compact. More data density than a portfolio, but never cramped. Think Linear's issue list — readable rows with clear hierarchy.

---

## 6. Component Patterns

### Cards

```
Dashboard Cards:
- Background: var(--surface-1)
- Border: 1px solid var(--surface-3)
- Border Radius: 8px
- Shadow: none (borders define edges in dark mode)
- Hover: border color lightens to var(--text-tertiary)
- Padding: var(--space-5)
```

### MetricCard

Two variants:

**Standard MetricCard:**
- Label (Inter Regular 400, `--text-small`, `--text-secondary`) + value (Inter SemiBold 600, `--text-h3`) + optional Lucide icon (24px)

**Hero MetricCard:**
- Spans 2 grid columns. Larger value (`--text-h2`). Used for "Current Streak" with Flame icon 24px, orange number.
- Hero variant for the most important at-a-glance metric.

### XPBar

| Element | Spec |
|---------|------|
| Badge | 32x32px, level number, circular |
| Bar height | 8px |
| Bar fill | `var(--color-primary)` (blue) |
| XP counter | JetBrains Mono, right-aligned, shows "1,200 / 2,500 XP" |
| Level-up | Celebration sequence (see §8 Motion) |

### HabitRow

| Element | Spec |
|---------|------|
| Checkbox | Blue fill on completion, checkmark draw-in animation |
| Name | Inter Regular 400, `--text-body` |
| XP value | `--text-small`, `--color-primary` (blue) |
| Streak indicator | Lucide Flame icon, orange number, 999px pill multiplier badge |
| Inline feedback | "+25 XP · Habit Name" appears in the habit name row on completion |

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| Primary | `var(--color-primary)` | `#FFFFFF` | none | Main actions |
| Accent | `var(--color-accent)` | `#FFFFFF` | none | Celebration actions |
| Secondary | transparent | `var(--text-primary)` | 1px `var(--surface-3)` | Cancel, secondary |
| Ghost | transparent | `var(--text-secondary)` | none | Tertiary, icon buttons |

- Border radius: 6px
- Padding: 6px 12px (compact/dashboard)
- Transition: 150ms ease

### Input Fields

- Background: `var(--surface-0)` with 1px border `var(--surface-3)`
- Focus: border color transitions to `var(--color-primary)`
- Border radius: 6px
- Height: 36px (compact/dashboard)
- Placeholder text: `var(--text-tertiary)`

### Sidebar Navigation

| Element | Spec |
|---------|------|
| Position | Fixed left rail, always visible |
| Width | 240px expanded, 64px collapsed |
| Background | `var(--surface-1)` |
| Border right | 1px `var(--surface-3)` |
| Items | Icon (20px) + label, active state: `var(--color-primary)` text with subtle background highlight |
| Profile | Bottom of sidebar: avatar/initials, name, level title. Reads USER_PROFILE dynamically. |

### Data Display

- **Tables:** Clean rows, subtle row dividers, no alternating row colors. JetBrains Mono for data values.
- **Cards:** For entity display (habit categories, metric summaries).
- **Lists:** For sequential data (activity feeds).

---

## 7. Gamification System

### XP Level Progression

| Level | Title | XP Required | Cumulative |
|-------|-------|-------------|------------|
| 1 | Recruit | 0 | 0 |
| 2 | Apprentice | 500 | 500 |
| 3 | Specialist | 1,200 | 1,700 |
| 4 | Veteran | 2,500 | 4,200 |
| 5 | Elite | 4,000 | 8,200 |
| 6 | Champion | 6,000 | 14,200 |
| 7 | Master | 8,500 | 22,700 |
| 8 | Grandmaster | 12,000 | 34,700 |
| 9 | Legend | 16,000 | 50,700 |
| 10 | Immortal | 25,000 | 75,700 |

### XP Sources

| Action | XP |
|--------|-----|
| Habit completion | +25 |
| Workout completion | +50 |
| Streak bonus | +10/day |
| Weekly review | +100 |
| Financial check-in | +30 |

### Streak Multiplier

| Streak Days | Multiplier |
|-------------|-----------|
| 1–7 | 1x |
| 8–14 | 1.5x |
| 15–30 | 2x |
| 31+ | 3x |

### Gamification Visual Treatment

- Game elements have **more visual weight** than standard UI. The XP bar, level badge, and streak counter are prominent.
- Level-up celebrations include color shifts, glow effects, animated XP bar fills.
- RPG labels (Recruit, Immortal, etc.) appear in standard Inter — the gamification is in the *system*, not the typography.
- The game layer is warm and rewarding without being loud or flashy.
- Game-like visual personality IS encouraged for XP bar, level-up celebrations, and streak displays. These elements can push beyond standard UI restraint.

---

## 8. Motion & Interaction

### Dashboard Motion

- **Snappy and immediate.** Interactions feel instant. No scroll animations.
- **Hover states:** Border/background color transitions at 150ms.
- **Panel/modal opens:** Scale from 0.98 to 1.0 + opacity 0 to 1. Duration: 200ms.
- **Tab/view switching:** Crossfade at 150ms. No sliding.
- **Data loading:** Illustrated loading states (see §11), never spinner-based.

### Celebration Motion

| Element | Spec |
|---------|------|
| XP bar fill | Animated width, 600ms ease-out, faint glow on fill edge |
| Level up | Color shift on level badge + scale pulse (1.0 → 1.05 → 1.0). Optional sound trigger. |
| Streak milestone | Streak counter briefly glows with accent orange. Satisfying, not disruptive. |
| Habit completion | Checkbox fills with primary blue, checkmark draw-in animation. |

**Reduced motion:** All celebration animations disabled. State changes happen instantly.

---

## 9. Toasts & Notifications

### Principle: Inline-First, Toast-for-Celebrations

Routine feedback appears **inline at the point of action**. Floating toasts are reserved for **level-ups only**.

### Inline Feedback (Default)

| Element | Spec |
|---------|------|
| Position | Right of (or below on mobile) the triggering element |
| Typography | Inter Medium 500, `--text-small` (14px), `--text-secondary` |
| Color | XP gains: `--color-primary` (blue). Streak milestones: `--color-accent` (orange). |
| Animation | Fade in + translateY (`-4px → 0`), 200ms ease-out |
| Duration | Visible 2.5 seconds, fade out over 300ms |
| Format | "+25 XP · [Habit Name]" or "7-day streak! 1.5x multiplier active" |
| Interaction | Non-interactive. Does not block clicks. |
| Stacking | Sequential with 400ms delay between appearances |

**Reduced motion:** Appears/disappears instantly (no translate animation).

### Celebration Toast (Level-Up Only)

| Element | Spec |
|---------|------|
| Position | Bottom-center, 24px from viewport bottom |
| Background | `--surface-2` with `1px solid --surface-3` |
| Border radius | 8px |
| Padding | 16px vertical, 24px horizontal |
| Content | "Level Up! → [New Title]. Keep going." — Inter SemiBold 600, `--text-body`, `--text-primary` |
| Accent | Left border: `3px solid --color-accent` (orange) |
| Animation | Fade in + translateY (`8px → 0`), 300ms ease-out |
| Duration | 4 seconds, fade out over 400ms |
| Dismissal | Auto-dismisses. No close button. |

### XP Bar Celebration (Accompanies Toast)

| Element | Spec |
|---------|------|
| Bar fill | Animated width to 100%, 600ms ease-out |
| Glow | `box-shadow: 0 0 12px var(--color-primary)` at 30% opacity, pulses once over 800ms |
| Reset | Bar resets to 0% for new level with 200ms fade transition |
| Title update | Level title text updates simultaneously with bar reset |

**Reduced motion:** Toast appears/disappears instantly. Bar fills instantly, no glow.

### Gamification Copy

| Event | Copy | Display |
|-------|------|---------|
| Habit completed | "+25 XP · [Habit Name]" | Inline, next to checkbox |
| Workout completed | "+50 XP · [Workout Name] logged" | Inline, next to entry |
| Streak milestone (7 days) | "7-day streak! 1.5x multiplier active" | Inline, next to streak counter |
| Streak milestone (30 days) | "30-day streak! 3x multiplier unlocked" | Inline, next to streak counter |
| Level up | "Level Up! → [New Title]. Keep going." | Celebration toast (bottom-center) |
| Streak broken | "Streak reset to Day 1. Start fresh." | Inline, next to streak counter |

---

## 10. Greeting System

The hub greets the user by name with a time-of-day variant and a contextual second line pulled from real data.

| Time | Greeting | Example Context Layer |
|------|----------|-----------------------|
| 5am–11am | Good morning, Sean | "12-day streak. Your best yet." |
| 12pm–5pm | Good afternoon, Sean | "3/5 quests done today." |
| 6pm–11pm | Good evening, Sean | "2 quests remaining tonight." |
| Midnight–4am | Still at it, Sean? | (Only if app is actually opened at these hours) |

**Context layer rules:** Pull from the most relevant real-time data — active streak count, quest completion progress, XP distance to next level. Rotate through available data points; don't repeat the same context on consecutive visits.

---

## 11. Empty & Loading States

### Empty State Pattern

**Treatment:** Illustrated + Text + CTA

Every empty state uses a small geometric/abstract illustration (max 120x120px) rendered in blue/orange at ~80/20 ratio, above a headline and description, with a primary action button.

| Element | Spec |
|---------|------|
| Illustration | Geometric/abstract, max 120x120px, `--color-primary` + `--color-accent` at 80/20. Inline SVGs. |
| Headline | Inter SemiBold 600, `--text-h3` (22px), `--text-primary`. One line. |
| Description | Inter Regular 400, `--text-body` (16px), `--text-secondary`. 1–2 sentences. |
| CTA Button | Primary button variant. Always present. |
| Spacing | 24px illustration→headline, 12px headline→description, 24px description→button |

### Empty State Copy

| Screen | Headline | Description | CTA |
|--------|----------|-------------|-----|
| Habits | Your quest log is empty | Add your first daily habit to start earning XP. | Add Habit |
| Finances | No spending data yet | Drop a Chase or Bilt CSV to see your first budget breakdown. | Import CSV |
| Fitness | No workouts logged | Start your first workout to light up the week. | Log Workout |
| Vault | Vault integration coming soon | Once connected, you'll see your Obsidian notes, inbox, and project counts here. | — (no CTA) |

### Loading State Pattern

**Treatment:** Illustrated (reduced opacity) + pulse animation

Same page-specific illustration as empty state, at 40% opacity with gentle pulse (`opacity: 0.3 → 0.5`, 1.8s ease-in-out, infinite). No skeleton placeholders. No spinners.

**Reduced motion:** Static 40% opacity, no pulse.

---

## 12. Responsive & Mobile Layout

### Mobile Navigation: Bottom Tab Bar

Below `--bp-tablet` (768px), the sidebar is replaced by a fixed bottom tab bar.

| Element | Spec |
|---------|------|
| Position | Fixed bottom, full viewport width |
| Height | 56px (includes `env(safe-area-inset-bottom)`) |
| Background | `--surface-1` with `1px solid --surface-3` top border |
| Items | Icon only, no labels. Max 5 tabs. |
| Icon size | 24px |
| Active state | `--color-primary`. Inactive: `--text-tertiary`. |
| Tap target | Minimum 44x44px |
| Animation | Color transition at 150ms ease. No bounce, no scale. |

**Tab mapping:** Hub (home), Habits, Fitness, Finances, Vault

### Sidebar Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| >=1024px | Full sidebar: 240px, icons + labels |
| 768px–1023px | Collapsed sidebar: 64px, icons only |
| <768px | Sidebar hidden, bottom tab bar visible |

### Mobile Metric Cards: Horizontal Scroll

Below `--bp-tablet` (768px):

| Element | Spec |
|---------|------|
| Layout | Single horizontal row, `overflow-x: auto`, `scroll-snap-type: x mandatory` |
| Card width | `min-width: 200px`, `scroll-snap-align: start` |
| Gap | 16px |
| Affordance | Last card's right edge bleeds to hint at scrollability |
| Momentum | Native momentum scrolling |

Desktop: CSS Grid `auto-fill, minmax(320px, 1fr)` preserved.

---

## 13. Chart & Data Visualization

### Chart Color Palette

**Primary series:** `--color-primary` (blue) is always the first/default series.
**Accent/threshold:** `--color-accent` (orange) reserved for thresholds, targets, anomalies. Never a regular series.

**Multi-series progression:**

| Series | Token | Hex |
|--------|-------|-----|
| Series 1 (default) | `--chart-series-1` | `#3B82F6` (Blue) |
| Series 2 | `--chart-series-2` | `#14B8A6` (Teal) |
| Series 3 | `--chart-series-3` | `#8B5CF6` (Violet) |
| Series 4 | `--chart-series-4` | `#64748B` (Slate) |
| Threshold/Target | `--chart-accent` | `#F97316` (Orange) |

If more than 4 series are needed, split into multiple charts.

### Chart Theme Object (Recharts)

| Element | Spec |
|---------|------|
| Background | Transparent (inherits card `--surface-1`) |
| Grid lines | `--surface-3` at 40% opacity. Horizontal only. |
| Axis labels | JetBrains Mono Regular 400, `--text-caption` (12px), `--text-secondary` |
| Axis lines | `--surface-3` |
| Tooltip background | `--surface-2` with `1px solid --surface-3`. Border radius 6px. |
| Tooltip text | Inter Medium 500, `--text-small` (14px), `--text-primary`. Values in JetBrains Mono. |
| Tooltip shadow | `0 4px 12px rgba(0, 0, 0, 0.3)` |
| Legend | Inter Regular 400, `--text-small`, `--text-secondary`. Below chart, left-aligned. 10x10px rounded swatches. |
| Data points | 6px circles on hover, hidden by default |
| Line weight | 2px stroke |
| Bar border radius | 4px top corners (flat bottom) |

---

## 14. Error Patterns

### Error Voice: Calm & Diagnostic

Factual, unemotional, precise. No apologetic language, no humor, no exclamation marks.

```
[Component Name] [what happened]. [Cause or next step].
```

### Error Copy

| Context | Copy |
|---------|------|
| CSV parse failure | "This file doesn't match a recognized CSV format. Verify the export source and try again." |
| Form field required | "This field is required." |
| Network error | "Can't reach the server. Check your connection and try again." |

### Error Display (Three Levels)

| Level | Where | Styling |
|-------|-------|---------|
| Inline field | Beneath invalid form field | Inter Regular 400, `--text-small`, `--color-error` |
| Card-level | Within the component that owns the error | Status badge shifts to `--color-error`. Error text in `--text-small`. |
| Page-level | Top of main content (rare — e.g., IndexedDB unavailable) | Banner, `--color-error` at 8% opacity background. Dismissible. |

---

## 15. Financial Security Boundary

Bank CSVs are parsed client-side ONLY. Financial data NEVER touches a server, API, or cloud service.

| Layer | Technology |
|-------|-----------|
| CSV parsing | PapaParse (client-side) |
| Local storage | IndexedDB via Dexie.js |
| Supported formats | Chase CSV (Transaction Date, Post Date, Description, Category, Type, Amount, Memo), Bilt CSV (headerless quoted) |
| Privacy indicator | "All financial data is stored locally" badge visible on Finances page |
| Hosting security | Netlify password protection for site access |

---

## 16. Anti-Patterns

Things to **never do** on the Life Systems Hub.

1. **No pixel fonts in the main UI.** The gamification is in the system (XP, levels, streaks), not the typography. Game elements use Inter and JetBrains Mono like everything else.
2. **No loading spinners.** Use illustrated loading states with pulse animation.
3. **No fire-alarm alerts.** Errors are communicated calmly.
4. **No pure black (#000000) or pure white (#FFFFFF) backgrounds.** Surface-0 is `#09090B`.
5. **No emoji in UI.** Use Lucide icons exclusively.
6. **No Cheesecake Factory menus.** Not everything should be equally prominent. The streak and XP metrics should stand out; utility metrics sit lower.
7. **No gratuitous animation.** Celebration motion is purposeful (rewarding progress). Everything else is snappy.

**Explicitly allowed:** Game-like visual personality on the XP bar, level-up celebration, and streak displays. These elements CAN push beyond standard UI restraint — glows, color shifts, scale pulses are welcome where they serve the gamification. The "no retro UI chrome" blanket restriction from the original unified spec does NOT apply here.

---

## 17. Reference Board

| Reference | What to Draw From |
|-----------|------------------|
| **shadcn/ui** | Component patterns, card designs, form elements, data tables, dark mode composition. Consult shadcn source as reference patterns when building new components. |
| **Linear** | Sidebar navigation pattern, information density, issue list readability |
| **Vercel** | Dark surface hierarchy, premium dark mode feel |

---

## 18. Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **React + Vite** | Full SPA for complex state management (XP, CSV parsing, real-time status) |
| Styling | **Tailwind CSS v4** | Shared token system via `@theme` directive in CSS |
| Local Data | **IndexedDB + Dexie.js** | Financial data never leaves browser |
| Data Parsing | **PapaParse** | Client-side CSV parsing |
| Charts | **Recharts** | React-native, dark mode support |
| Icons | **lucide-react** | Consistent icon system |
| Hosting | **Netlify** (free tier) | Password-protected deployment |

### "Coming Soon" Pattern

| Element | Spec |
|---------|------|
| Structure | [Feature Name] · [One-sentence description] · "Coming Soon" badge |
| Feel | Roadmap item, not a broken feature |

---

*This specification represents committed design decisions for the Life Systems Hub. Every choice was deliberate. The visual foundation is shadcn/ui engineering-grade precision. The personality is the gamification system — warm, rewarding, personal. "Your save file, loaded."*
