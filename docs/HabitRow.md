# HabitRow — Component Mini-Spec

> **Project:** Life Systems Hub
> **Mode:** Dark mode only
> **Spec references:** Sections 2, 3, 4, 6, 7, 12, 13, 19
> **Audit reference:** Practice 7 (personality injection — the completion moment)

---

## Design Intent

The HabitRow is the **core gamification interaction** of the Life Systems Hub. Checking a habit off is the moment the player earns XP and extends their streak — it must feel satisfying, not transactional. The checkbox animation, the inline "+25 XP" feedback, and the streak counter together create a micro-reward loop. In a weekly grid context, a row of filled checkboxes across 7 days becomes a visual proof of consistency — the filled days are the payoff.

---

## Component Anatomy

### Single-Day View (Hub / Today)

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  [☐] Habit Name                   +25 XP    [🔥 12 days]  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

| # | Element | Required | Description |
|---|---------|----------|-------------|
| 1 | Checkbox | Yes | Custom-styled checkbox. Unchecked: border only. Checked: filled with primary blue + animated checkmark. |
| 2 | Habit name | Yes | The habit's display name. |
| 3 | XP value | Yes | The XP reward for this habit (e.g., "+25 XP"). Always visible but muted until earned. |
| 4 | Streak indicator | Yes | Current streak count with a Lucide `Flame` icon. |
| 5 | Inline feedback | Conditional | "+25 XP · [Habit Name]" appears after completion, then fades. |

### Weekly Grid View (Habits Page)

```
┌──────────────────────────────────────────────────────────────────┐
│                   Mon   Tue   Wed   Thu   Fri   Sat   Sun       │
│  [Habit Name]     [✓]   [✓]   [✓]   [✓]   [ ]   [ ]   [ ]     │
│  [Habit Name]     [✓]   [✓]   [ ]   [✓]   [✓]   [ ]   [ ]     │
└──────────────────────────────────────────────────────────────────┘
```

In the weekly view, each HabitRow spans 7 columns. The habit name is on the left, and 7 checkbox cells form the grid. The XP value and streak appear in the rightmost column or as a summary at row-end.

---

## Spacing

### Single-Day Row

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Row height | — | 48px | Fixed. Comfortable tap target, consistent vertical rhythm. |
| Row horizontal padding | `--space-4` | 16px | Left and right. |
| Checkbox size | — | 20px × 20px | Matches `--icon-md`. |
| Gap: checkbox to habit name | `--space-3` | 12px | Horizontal. |
| Gap: habit name to XP value | — | flex spacer | Habit name takes available space; XP and streak are right-aligned. |
| Gap: XP value to streak | `--space-4` | 16px | Horizontal. |
| Streak icon size | `--icon-sm` | 16px | Inline with streak text. |
| Gap: streak icon to streak number | `--space-1` | 4px | Horizontal. |

### Weekly Grid

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Name column width | — | 160px min, 200px preferred | Fixed left column. |
| Day column width | — | Equal-width across remaining space | Flex: `1 1 0`. |
| Cell padding | `--space-2` | 8px | All sides within each day cell. |
| Row gap | `--space-1` | 4px | Between habit rows. |
| Header row height | — | 32px | Day labels (Mon, Tue, etc.). |

---

## Typography

| Element | Font | Weight | Size Token | Color Token |
|---------|------|--------|------------|-------------|
| Habit name (incomplete) | Inter | Regular 400 | `--text-body` (16px) | `--text-primary` |
| Habit name (completed) | Inter | Regular 400 | `--text-body` (16px) | `--text-secondary` (dims on completion) |
| XP value (unearned) | Inter | Regular 400 | `--text-small` (14px) | `--text-tertiary` |
| XP value (earned/display) | Inter | Medium 500 | `--text-small` (14px) | `--color-primary` (blue) |
| Streak count | Inter | Medium 500 | `--text-small` (14px) | `--text-primary` |
| Streak icon | Lucide `Flame` | — | `--icon-sm` (16px) | `--color-accent` (`#F97316`) — streak earns the orange |
| Inline feedback text | Inter | Medium 500 | `--text-small` (14px) | `--color-primary` (blue) |
| Weekly day headers | Inter | Medium 500 | `--text-caption` (12px) | `--text-secondary` |

**XP format:** "+25 XP" — plus sign, space, "XP" uppercase. Per spec section 19.

---

## Checkbox Styling

### Unchecked

| Property | Value |
|----------|-------|
| Size | 20px × 20px |
| Border | `2px solid --surface-3` (`#3F3F46`) |
| Background | transparent |
| Border radius | 4px (slightly rounded, not circular) |
| Cursor | pointer |

### Hover (unchecked)

| Property | Value |
|----------|-------|
| Border | `2px solid --text-tertiary` (`#71717A`) |
| Background | `--color-primary` at 8% opacity |
| Transition | 150ms ease |

### Checked (completion)

| Property | Value |
|----------|-------|
| Border | `2px solid --color-primary` (`#3B82F6`) |
| Background | `--color-primary` (`#3B82F6`) |
| Checkmark | White (`#FFFFFF`), 2px stroke, animated draw-in |
| Transition | background 150ms ease |

### Focus (keyboard)

| Property | Value |
|----------|-------|
| Outline | `2px solid --color-primary` at 50% opacity |
| Outline offset | 2px |

### Disabled

| Property | Value |
|----------|-------|
| Opacity | 0.5 |
| Cursor | not-allowed |
| Border | `2px solid --surface-3` |

---

## Checkmark Draw-In Animation

The checkmark is an SVG path that animates using `stroke-dashoffset`.

| Property | Value |
|----------|-------|
| SVG path | A simple checkmark (two connected lines) |
| Stroke | `#FFFFFF`, 2px |
| `stroke-dasharray` | Set to total path length |
| `stroke-dashoffset` | Starts at total path length (invisible), animates to 0 (fully drawn) |
| Duration | 200ms |
| Easing | ease-out |
| Trigger | On checkbox state change to `checked` |

---

## Inline Feedback (Completion)

When a habit is checked, inline feedback appears per spec section 13.

| Property | Value |
|----------|-------|
| Content | "+25 XP · [Habit Name]" |
| Position | To the right of the checkbox (single-day view). Below the checkbox cell (weekly grid, mobile). |
| Font | Inter Medium 500, `--text-small` (14px) |
| Color | `--color-primary` (blue) for XP gains. `--color-accent` (orange) for streak milestones. |
| Entry animation | Fade in + `translateY(-4px → 0)`, 200ms ease-out |
| Visible duration | 2.5 seconds |
| Exit animation | Fade out over 300ms |
| Interaction | Non-interactive. Does not block clicks on surrounding elements. |
| Z-index | Above the row content but below any modal/overlay. |

### Stacking (multiple completions)

If multiple habits are completed in rapid succession, inline notifications appear sequentially with a `400ms` delay between appearances. They do not stack visually — each one fades before or as the next appears.

### Streak Milestone Feedback

When a completion triggers a streak milestone (7-day, 30-day):

| Milestone | Copy | Color |
|-----------|------|-------|
| 7-day streak | "7-day streak! 1.5x multiplier active" | `--color-accent` (orange) |
| 30-day streak | "30-day streak! 3x multiplier unlocked" | `--color-accent` (orange) |

This replaces the standard "+25 XP" feedback for that completion. Appears inline, same position and timing.

---

## Visual States

### Default (incomplete habit, today)
Row background: transparent. Checkbox unchecked. Habit name in `--text-primary`. XP value in `--text-tertiary` (muted).

### Hover (row)
Row background: `--surface-1` at 50% opacity (very subtle highlight). Checkbox border brightens.

### Completed (today)
Checkbox: filled blue with white checkmark. Habit name: color shifts to `--text-secondary` (dims). XP value: shifts to `--color-primary` (earned). Inline feedback triggers.

### Completed (past day, weekly view)
Checkbox: filled blue with white checkmark. No inline feedback (feedback only on the moment of completion).

### Missed (past day, weekly view)
Checkbox: remains unchecked but border is `--surface-3` at 50% opacity (dimmer than today's unchecked). Non-interactive — past days cannot be toggled.

### Streak broken
Streak counter resets visually. Flame icon: color shifts from `--color-accent` to `--text-tertiary`. Inline feedback: "Streak reset to Day 1. Start fresh." in `--text-secondary`.

### Loading
> **Note:** This component-level skeleton is for partial data loading within an already-rendered page. Page-level loading (before any data arrives) uses the illustrated loading pattern defined in spec section 12.

Row renders at 48px height. Checkbox: `--surface-2` filled square (no border animation). Habit name: skeleton placeholder, 50% width. XP/streak: skeleton placeholder. Pulse animation: opacity `0.3 → 0.5`, 1.8s, ease-in-out.

### Empty (no habits)
HabitRow does not render individually in an empty state. The page-level empty state handles this: illustration + "Your quest log is empty" + "Add your first daily habit to start earning XP." + "Add Habit" CTA.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px (`--bp-desktop`) | Full weekly grid visible. All 7 day columns render. |
| 768px–1023px | Weekly grid may compress; day labels abbreviate to single letters (M, T, W, T, F, S, S). |
| <768px (`--bp-tablet`) | Weekly grid switches to single-day view (today only). Swipe or tab navigation for other days. Row layout unchanged. Inline feedback appears below the checkbox rather than to the right. |

---

## Animation Specs

| Animation | Property | Duration | Easing | Trigger |
|-----------|----------|----------|--------|---------|
| Checkbox fill | `background-color` | 150ms | ease | State change to checked |
| Checkmark draw-in | `stroke-dashoffset` | 200ms | ease-out | State change to checked |
| Row hover background | `background-color` | 150ms | ease | Mouse enter/leave |
| Inline feedback enter | `opacity`, `transform` | 200ms | ease-out | Completion event |
| Inline feedback exit | `opacity` | 300ms | ease-in | 2.5s after appearance |
| Habit name dim | `color` | 200ms | ease | Completion event |
| XP value color shift | `color` | 200ms | ease | Completion event |

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Checkbox fill: instant (no transition)
- Checkmark: appears instantly (no draw-in, full SVG visible)
- Inline feedback: appears instantly, disappears instantly after 2.5s (no fade)
- Row hover: instant background change
- Habit name dim: instant color change

---

## Do Not List

1. **Do not use a circular checkbox.** The checkbox is a `4px` rounded square (20px × 20px). Circular checkboxes read as radio buttons.
2. **Do not use a green fill** for the completed checkbox. The fill is `--color-primary` (blue). Green is reserved for the `--color-success` semantic token used in status badges.
3. **Do not use emoji** for the streak indicator. Use the Lucide `Flame` icon at `--icon-sm` (16px).
4. **Do not show a toast** for individual habit completion. Habit XP feedback is always inline per spec section 13. Only level-ups get a floating toast.
5. **Do not make past days editable** in the weekly view. Only today's checkboxes are interactive.
6. **Do not animate row height.** Rows are always 48px. No expand/collapse behavior.
7. **Do not use alternating row colors.** Spec section 5 explicitly prohibits alternating row colors in data tables and lists.
8. **Do not use bold text** for the habit name. It's Inter Regular 400. The hierarchy is in the completion state (dim vs. bright), not weight.
9. **Do not add sound effects** without a user preference toggle. Sound cues are opt-in per spec.
10. **Do not show the inline feedback permanently.** It appears for 2.5 seconds and fades. The earned state is shown by the XP value turning blue, not by persistent feedback.
