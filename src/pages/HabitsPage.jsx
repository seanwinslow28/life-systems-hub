import React, { useState } from 'react';
import { HABITS_LIST, HABIT_WEEK_GRID, HABIT_STREAKS } from '../data.js';
import { useToast } from '../components/Toast.jsx';

const DAYS = HABIT_WEEK_GRID.days;
const DATES = HABIT_WEEK_GRID.dates;
const TODAY_INDEX = HABIT_WEEK_GRID.todayIndex;

export default function HabitsPage() {
  const { addToast } = useToast();
  const [habits, setHabits] = useState(HABITS_LIST);
  const [completions, setCompletions] = useState(HABIT_WEEK_GRID.completions);
  const [streaks, setStreaks] = useState(HABIT_STREAKS);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitXP, setNewHabitXP] = useState('25');

  const toggleCell = (habitId, dayIndex) => {
    if (dayIndex > TODAY_INDEX) return; // can't complete future
    setCompletions((prev) => {
      const row = [...(prev[habitId] || [])];
      row[dayIndex] = !row[dayIndex];
      return { ...prev, [habitId]: row };
    });
    const wasComplete = completions[habitId]?.[dayIndex];
    if (!wasComplete) {
      const xp = habits.find((h) => h.id === habitId)?.xpReward || 25;
      addToast(`+${xp} XP earned`, 'xp');
    }
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const newId = Math.max(...habits.map((h) => h.id)) + 1;
    setHabits((prev) => [...prev, {
      id: newId,
      name: newHabitName.trim(),
      xpReward: parseInt(newHabitXP) || 25,
      category: 'custom',
    }]);
    setCompletions((prev) => ({ ...prev, [newId]: Array(7).fill(false) }));
    setStreaks((prev) => ({ ...prev, [newId]: 0 }));
    setNewHabitName('');
    setNewHabitXP('25');
  };

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          Habits
        </h1>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>Week of Feb 25 – Mar 3, 2026</p>
      </div>

      {/* Weekly Tracker Grid */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        overflow: 'hidden',
        marginBottom: 'var(--space-5)',
      }}>
        {/* Grid header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(7, 44px) 64px',
          gap: 0,
          borderBottom: '1px solid var(--surface-3)',
          backgroundColor: 'var(--surface-2)',
          padding: '0 var(--space-5)',
        }}>
          <div style={{ padding: '8px 0', fontSize: 'var(--text-caption)', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Habit
          </div>
          {DAYS.map((day, i) => (
            <div key={day} style={{
              padding: '8px 0',
              textAlign: 'center',
              fontSize: 'var(--text-caption)',
              fontWeight: i === TODAY_INDEX ? 600 : 400,
              color: i === TODAY_INDEX ? 'var(--color-primary)' : 'var(--text-tertiary)',
            }}>
              {day}
            </div>
          ))}
          <div style={{ padding: '8px 0', textAlign: 'right', fontSize: 'var(--text-caption)', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingRight: 0 }}>
            Streak
          </div>
        </div>

        {/* Habit rows */}
        {habits.map((habit, habitIdx) => {
          const row = completions[habit.id] || Array(7).fill(false);
          const streak = streaks[habit.id] || 0;

          return (
            <div
              key={habit.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr repeat(7, 44px) 64px',
                gap: 0,
                padding: '0 var(--space-5)',
                borderBottom: habitIdx < habits.length - 1 ? '1px solid var(--surface-3)' : 'none',
                alignItems: 'center',
                transition: 'background-color 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--surface-2) 40%, transparent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {/* Habit name */}
              <div style={{ padding: '12px 0' }}>
                <div style={{ fontSize: 'var(--text-small)', color: 'var(--text-primary)', fontWeight: 400 }}>
                  {habit.name}
                </div>
                <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 1 }}>
                  +{habit.xpReward} XP
                </div>
              </div>

              {/* Day cells */}
              {DAYS.map((_, dayIdx) => {
                const done = row[dayIdx];
                const isFuture = dayIdx > TODAY_INDEX;

                return (
                  <div
                    key={dayIdx}
                    onClick={() => !isFuture && toggleCell(habit.id, dayIdx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      padding: '12px 6px',
                      cursor: isFuture ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      backgroundColor: done ? 'var(--color-primary)' : isFuture ? 'var(--surface-2)' : 'var(--surface-2)',
                      border: done ? 'none' : dayIdx === TODAY_INDEX ? '1.5px solid var(--surface-3)' : '1.5px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 200ms ease',
                      opacity: isFuture ? 0.35 : 1,
                    }}>
                      {done && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l2.5 2.5 5.5-5"/>
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Streak */}
              <div style={{
                textAlign: 'right',
                padding: '12px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 4,
              }}>
                {streak > 0 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="var(--color-accent)" opacity="0.8">
                    <path d="M6 1C4.5 3.5 4 4 4 5.5A2 2 0 008 5.5C8 4 7.5 3.5 6 1Z"/>
                  </svg>
                )}
                <span style={{
                  fontSize: 'var(--text-caption)',
                  fontFamily: 'var(--font-mono)',
                  color: streak >= 7 ? 'var(--color-accent)' : 'var(--text-secondary)',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: streak >= 7 ? 600 : 400,
                }}>
                  {streak}d
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Habit Form */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
      }}>
        <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Add Habit
        </h2>
        <form onSubmit={addHabit} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={{ display: 'block', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Habit Name
            </label>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="e.g. Meditate 10 minutes"
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--surface-3)',
                borderRadius: 'var(--radius-button)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-small)',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                transition: 'border-color 150ms ease',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3)'; }}
            />
          </div>
          <div style={{ width: 100 }}>
            <label style={{ display: 'block', fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              XP Value
            </label>
            <input
              type="number"
              value={newHabitXP}
              onChange={(e) => setNewHabitXP(e.target.value)}
              min="5"
              max="200"
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'var(--surface-2)',
                border: '1px solid var(--surface-3)',
                borderRadius: 'var(--radius-button)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-small)',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                transition: 'border-color 150ms ease',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--surface-3)'; }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: '8px 20px',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-small)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 150ms ease',
              whiteSpace: 'nowrap',
              height: 36,
            }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-primary-muted)'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--color-primary)'; }}
          >
            Add Habit
          </button>
        </form>
      </div>

    </div>
  );
}
