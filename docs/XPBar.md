# XPBar — Component Mini-Spec

> **Project:** Life Systems Hub
> **Mode:** Dark mode only
> **Spec references:** Sections 2, 3, 4, 6, 7, 13, 19
> **Audit reference:** Practice 7 ("XP glow" signature detail)

---

## Design Intent

The XP bar is the **centerpiece of the gamification system** — the single most prominent progress indicator on the Life Systems Hub. It answers three questions: How much XP do I have? How close am I to the next level? What level am I? The fill animation and level-up glow are the primary reward moments in the entire interface. This component must feel satisfying — the visual payoff for completing habits, logging workouts, and maintaining streaks.

---

## Component Anatomy

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [Level Badge]  Level 7 — Veteran          5,100 / 8,200 XP │
│                                                          │
│  ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                          │
│                    900 XP to Elite                        │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

| # | Element | Required | Description |
|---|---------|----------|-------------|
| 1 | Level badge | Yes | Circular or rounded-square badge displaying the current level number. |
| 2 | Level title | Yes | Current level number + title text (e.g., "Level 7 — Veteran"). |
| 3 | XP counter | Yes | Current XP / XP needed for next level (e.g., "5,100 / 8,200 XP"). Right-aligned on the same row as the level title. |
| 4 | Progress bar track | Yes | The full-width background track that the fill sits inside. |
| 5 | Progress bar fill | Yes | The colored portion representing progress toward the next level. |
| 6 | Subtitle text | Yes | Distance to next level and next title name (e.g., "900 XP to Elite"). Centered below the bar. |

---

## Spacing

| Property | Token | Value | Notes |
|----------|-------|-------|-------|
| Component outer padding | `--space-5` | 20px | If rendered inside a card. If standalone, no outer padding — parent handles it. |
| Gap: level badge to level title | `--space-3` | 12px | Horizontal. |
| Gap: title row to progress bar | `--space-3` | 12px | Vertical. |
| Gap: progress bar to subtitle | `--space-2` | 8px | Vertical. |
| Progress bar height | — | 8px | Fixed. Not a token; specific to this component. |
| Progress bar border radius | — | 4px | Half of bar height. Rounded ends. |
| Level badge size | — | 32px × 32px | Fixed. |
| Level badge border radius | — | 6px | Rounded square, matches button radius. |

---

## Typography

| Element | Font | Weight | Size Token | Color Token |
|---------|------|--------|------------|-------------|
| Level number (inside badge) | Inter | SemiBold 600 | `--text-small` (14px) | `#FFFFFF` (on primary-colored badge) |
| Level title | Inter | SemiBold 600 | `--text-body` (16px) | `--text-primary` |
| Title separator (—) | Inter | Regular 400 | `--text-body` (16px) | `--text-tertiary` |
| Level name (e.g., "Veteran") | Inter | Medium 500 | `--text-body` (16px) | `--text-secondary` |
| XP counter (current) | JetBrains Mono | Regular 400 | `--text-small` (14px) | `--text-primary` |
| XP counter (separator /) | JetBrains Mono | Regular 400 | `--text-small` (14px) | `--text-tertiary` |
| XP counter (total) | JetBrains Mono | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| "XP" label | JetBrains Mono | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Subtitle | Inter | Regular 400 | `--text-small` (14px) | `--text-secondary` |
| Subtitle level name | Inter | Medium 500 | `--text-small` (14px) | `--text-primary` |

**Number formatting:** XP values use comma separators for thousands (e.g., "5,100" not "5100"). Per spec section 19, XP format is "+50 XP" for gains, but in the bar context it's "5,100 / 8,200 XP" (no plus sign).

---

## Visual Styling

### Progress Bar Track
| Property | Value |
|----------|-------|
| Background | `--surface-2` (`#27272A`) |
| Height | 8px |
| Border radius | 4px |
| Width | 100% of component width |

### Progress Bar Fill
| Property | Value |
|----------|-------|
| Background | `--color-primary` (`#3B82F6`) |
| Height | 8px (matches track) |
| Border radius | 4px (matches track) |
| Width | Percentage of `currentXP / xpNeeded * 100` |
| Min-width | 0px (can be empty at start of new level) |

### Level Badge
| Property | Value |
|----------|-------|
| Background | `--color-primary` (`#3B82F6`) |
| Size | 32px × 32px |
| Border radius | 6px |
| Display | Flexbox, center-center alignment |

---

## Visual States

### Default (progress in mid-range)
Standard display as specified in anatomy. Fill width reflects current XP percentage.

### Near level-up (≥90% fill)
No visual change to the bar itself. The subtitle text naturally reflects proximity (e.g., "120 XP to Elite"). The anticipation is in the numbers, not a visual treatment.

### Level-up sequence (animated)
This is the signature reward moment. The sequence is:

| Step | What Happens | Duration | Easing |
|------|-------------|----------|--------|
| 1. Fill to 100% | Bar fill animates from current width to `100%` | 600ms | ease-out |
| 2. Glow pulse | `box-shadow: 0 0 12px var(--color-primary)` appears at `30%` opacity, pulses once | 800ms | ease-in-out |
| 3. Bar reset | Fill fades to `0%` for the new level | 200ms | ease (fade transition) |
| 4. Title update | Level number increments, title text changes (e.g., "Veteran → Elite") | Simultaneous with step 3 | — |
| 5. Badge pulse | Badge scales `1.0 → 1.05 → 1.0` | 300ms | ease-out |

**Celebration toast (accompanies sequence):** A level-up toast appears at bottom-center per spec section 13: "Level Up! → [New Title]. Keep going." See the spec for full toast styling.

### Empty (Level 1, 0 XP)
- Fill width: 0% (track fully visible, no fill)
- XP counter: "0 / 1,000 XP"
- Subtitle: "1,000 XP to [Next Title]"
- Level badge shows "1"
- No special empty state illustration — the bar renders normally at zero

### Loading (data fetching)
> **Note:** This component-level skeleton is for partial data loading within an already-rendered page. Page-level loading (before any data arrives) uses the illustrated loading pattern defined in spec section 12.
- Track renders at full width in `--surface-2`
- Fill is not visible (0% width)
- Level title: skeleton placeholder (`--surface-2`, 120px wide)
- XP counter: skeleton placeholder (`--surface-2`, 100px wide)
- Subtitle: skeleton placeholder (`--surface-2`, 80px wide)
- Skeleton pulse: opacity `0.3 → 0.5`, `1.8s`, ease-in-out, infinite
- Level badge: `--surface-2` background (no number)

### Error (XP data unavailable)
- Track renders normally
- Fill at 0%
- XP counter: "— / — XP" in `--text-tertiary`
- Subtitle: "XP data unavailable" in `--color-error`, `--text-small`
- Level badge: shows last known level or "?" in `--text-tertiary`

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px (`--bp-desktop`) | Full layout as specified. XP counter right-aligned on title row. |
| 768px–1023px | No change. Component is fluid-width, naturally responsive. |
| <768px (`--bp-tablet`) | XP counter moves below the level title (stacks vertically). Subtitle remains centered. All padding reduces to `--space-4` (16px). Bar height unchanged (8px). |

---

## Animation Specs

| Animation | Property | Duration | Easing | Trigger |
|-----------|----------|----------|--------|---------|
| XP gain (normal) | `width` of fill | 600ms | ease-out | XP value increases |
| Level-up glow | `box-shadow` | 800ms | ease-in-out | XP reaches 100% (single pulse, not looped) |
| Level-up reset | `opacity` of fill | 200ms | ease | After glow completes |
| Badge pulse | `transform: scale()` | 300ms | ease-out | Level number increments |
| Skeleton pulse | `opacity` | 1.8s | ease-in-out | Loading state (infinite loop) |

**Important animation note:** The XP bar fill animation is the ONE exception to the "GPU-only properties" rule — it animates `width` because the fill is a contained child element inside the track and the visual effect requires it. This is acceptable because the bar is small (8px tall), contained, and not layout-affecting. Use `will-change: width` on the fill element.

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- XP gain: fill jumps instantly to new width (no animation)
- Level-up: fill jumps to 100%, no glow, resets instantly to 0%
- Badge pulse: no scale animation, number updates instantly
- Title update: instant text swap
- Skeleton pulse: static at `40%` opacity
- Level-up toast: appears/disappears instantly (per spec section 13)

---

## Do Not List

1. **Do not use a spinner** for the loading state. Use skeleton placeholders per spec.
2. **Do not make the bar taller than 8px.** Taller bars look like progress meters, not XP bars. The slim profile is intentional.
3. **Do not use orange for the fill color.** The fill is always `--color-primary` (blue). Orange only appears in the celebration toast's left accent border.
4. **Do not use a gradient on the fill.** Solid `--color-primary`. No gradients, no shimmer effects.
5. **Do not loop the glow animation.** The glow pulses exactly once during level-up, then stops. A looping glow is a decorative anti-pattern.
6. **Do not use pixel fonts or RPG-styled typography** for the level title. The gamification is in the system, not the typography. Inter and JetBrains Mono only.
7. **Do not add a percentage label** on the bar itself. The XP counter provides the exact numbers; a percentage would be redundant and cluttered.
8. **Do not make the level badge pill-shaped.** It's a `6px` rounded square, matching the system's button radius.
9. **Do not animate the bar height or component height.** Only the fill width animates. Everything else stays dimensionally stable.
10. **Do not use sound effects without a user preference toggle.** Sound on level-up is optional per spec section 6 — it must be opt-in.
