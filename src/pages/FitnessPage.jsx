import React, { useState } from 'react';
import { WORKOUT_WEEK } from '../data.js';

const SPLIT_COLORS = {
  Push: 'var(--color-primary)',
  Pull: '#A78BFA',
  Legs: '#22C55E',
  Rest: 'var(--text-tertiary)',
};

const STATUS_STYLES = {
  completed: {
    background: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
    border: '1px solid color-mix(in srgb, var(--color-primary) 40%, transparent)',
    color: 'var(--color-primary)',
  },
  today: {
    background: 'color-mix(in srgb, var(--color-primary) 8%, transparent)',
    border: '2px solid var(--color-primary)',
    color: 'var(--color-primary)',
  },
  scheduled: {
    background: 'transparent',
    border: '1px solid var(--surface-3)',
    color: 'var(--text-tertiary)',
  },
  rest: {
    background: 'transparent',
    border: '1px dashed var(--surface-3)',
    color: 'var(--text-tertiary)',
  },
};

export default function FitnessPage() {
  const [selectedDay, setSelectedDay] = useState(null);

  const selectedWorkout = selectedDay !== null
    ? WORKOUT_WEEK.find((w) => w.day === selectedDay)
    : null;

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          Fitness
        </h1>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>Week of Feb 25 – Mar 3, 2026 · PPL Split</p>
      </div>

      {/* Weekly Split Row */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-5)',
      }}>
        <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          This Week
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 'var(--space-2)' }}>
          {WORKOUT_WEEK.map((workout) => {
            const isSelected = selectedDay === workout.day;
            const styles = STATUS_STYLES[workout.status];
            const isClickable = workout.status === 'completed';

            return (
              <div
                key={workout.day}
                onClick={() => isClickable && setSelectedDay(isSelected ? null : workout.day)}
                style={{
                  ...styles,
                  borderRadius: 'var(--radius-button)',
                  padding: 'var(--space-3) var(--space-2)',
                  textAlign: 'center',
                  cursor: isClickable ? 'pointer' : 'default',
                  transition: 'all 150ms ease',
                  outline: isSelected ? `2px solid var(--color-primary)` : 'none',
                  outlineOffset: 2,
                }}
                onMouseEnter={(e) => {
                  if (isClickable && !isSelected) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isClickable && !isSelected) {
                    e.currentTarget.style.borderColor = STATUS_STYLES[workout.status].border.includes('color-mix')
                      ? 'color-mix(in srgb, var(--color-primary) 40%, transparent)'
                      : 'var(--surface-3)';
                  }
                }}
              >
                <div style={{ fontSize: 'var(--text-caption)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
                  {workout.day}
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: workout.status === 'completed'
                    ? 'color-mix(in srgb, var(--color-primary) 20%, transparent)'
                    : workout.status === 'today'
                    ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)'
                    : 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-2)',
                }}>
                  {workout.status === 'completed' ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8l3.5 3.5 6.5-7"/>
                    </svg>
                  ) : workout.status === 'today' ? (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}/>
                  ) : workout.status === 'rest' ? (
                    <span style={{ fontSize: 10, color: 'var(--text-tertiary)' }}>ZZ</span>
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--surface-3)' }}/>
                  )}
                </div>
                <div style={{
                  fontSize: 'var(--text-caption)',
                  color: SPLIT_COLORS[workout.split] || 'var(--text-tertiary)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}>
                  {workout.split}
                </div>
              </div>
            );
          })}
        </div>
        {selectedDay && (
          <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            Click a completed day to see exercises
          </div>
        )}
        {!selectedDay && (
          <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            Click a completed day (Mon, Tue) to view exercises
          </div>
        )}
      </div>

      {/* Workout Detail */}
      {selectedWorkout && selectedWorkout.exercises.length > 0 && (
        <div style={{
          backgroundColor: 'var(--surface-1)',
          border: '1px solid var(--surface-3)',
          borderRadius: 'var(--radius-dashboard-card)',
          overflow: 'hidden',
          marginBottom: 'var(--space-5)',
          animation: 'toast-in 200ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--surface-3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)' }}>
              {selectedWorkout.day} · {selectedWorkout.split} Day · {selectedWorkout.date}
            </h2>
            <button
              onClick={() => setSelectedDay(null)}
              style={{ color: 'var(--text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l8 8M12 4l-8 8"/>
              </svg>
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-2)' }}>
                {['Exercise', 'Sets', 'Reps', 'Weight'].map((h) => (
                  <th key={h} style={{
                    textAlign: 'left',
                    padding: '8px 16px',
                    fontSize: 'var(--text-caption)',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedWorkout.exercises.map((ex, i) => (
                <tr
                  key={i}
                  style={{ transition: 'background-color 150ms' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--surface-3)', color: 'var(--text-primary)', fontSize: 'var(--text-small)' }}>{ex.name}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--surface-3)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: 'var(--color-primary)' }}>{ex.sets}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--surface-3)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{ex.reps}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid var(--surface-3)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>
                    {ex.unit === 'bw' ? 'Bodyweight' : `${ex.weight} lbs`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Apple Health Coming Soon */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: 'color-mix(in srgb, var(--color-error) 12%, transparent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2C9 2 6 3.5 6 7C6 9.5 7.5 11 9 11C10.5 11 12 9.5 12 7C12 3.5 9 2 9 2Z" fill="#EF4444" opacity="0.8"/>
              <path d="M9 7V16" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 10C4 10.5 3 12.5 3 14.5C3 15.5 3.5 16 4.5 16H13.5C14.5 16 15 15.5 15 14.5C15 12.5 14 10.5 12 10" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              Apple Health Sync
            </div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', marginTop: 2 }}>
              Connect workouts, sleep, and activity data
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            className="pulse-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>Coming Soon</span>
        </div>
      </div>

    </div>
  );
}
