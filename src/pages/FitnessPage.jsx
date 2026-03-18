import React, { useState } from 'react';
import { Moon, Heart, Clock } from 'lucide-react';
import { WORKOUT_WEEK } from '../data.js';

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

      {/* Weekly PPL Grid */}
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
            const isClickable = workout.status === 'completed';
            const isToday = workout.status === 'today';
            const isRest = workout.status === 'rest';
            const isFuture = workout.status === 'scheduled';

            return (
              <div
                key={workout.day}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                aria-label={`${workout.day} — ${workout.split}${workout.status === 'completed' ? ' (completed)' : workout.status === 'rest' ? ' (rest day)' : workout.status === 'today' ? ' (today)' : ' (scheduled)'}`}
                onClick={() => isClickable && setSelectedDay(isSelected ? null : workout.day)}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    setSelectedDay(isSelected ? null : workout.day);
                  }
                }}
                style={{
                  borderRadius: 'var(--radius-button)',
                  padding: 'var(--space-3) var(--space-2)',
                  textAlign: 'center',
                  cursor: isClickable ? 'pointer' : 'default',
                  transition: 'all 150ms ease',
                  outline: isSelected ? '2px solid var(--color-primary)' : 'none',
                  outlineOffset: 2,
                  // Completed = blue fill
                  backgroundColor: workout.status === 'completed'
                    ? 'color-mix(in srgb, var(--color-primary) 15%, transparent)'
                    : 'transparent',
                  // Today = blue border no fill; Rest = solid surface-3; Future = dashed
                  border: isToday
                    ? '2px solid var(--color-primary)'
                    : workout.status === 'completed'
                    ? '1px solid color-mix(in srgb, var(--color-primary) 40%, transparent)'
                    : isFuture
                    ? '1px dashed var(--surface-3)'
                    : '1px solid var(--surface-3)',
                  opacity: isFuture ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (isClickable && !isSelected) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isClickable && !isSelected) {
                    e.currentTarget.style.borderColor = workout.status === 'completed'
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
                    : isToday
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
                  ) : isToday ? (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}/>
                  ) : isRest ? (
                    <Moon size={14} color="var(--text-tertiary)" />
                  ) : (
                    <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--surface-3)' }}/>
                  )}
                </div>
                <div style={{
                  fontSize: 'var(--text-caption)',
                  color: workout.status === 'completed'
                    ? 'var(--color-primary)'
                    : isToday
                    ? 'var(--color-primary)'
                    : 'var(--text-tertiary)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                }}>
                  {workout.split}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', textAlign: 'center' }}>
          {selectedDay ? 'Click a completed day to see exercises' : 'Click a completed day to view exercises'}
        </div>
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

      {/* Apple Health Sync — Coming Soon pattern (spec section 19) */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-6)',
        textAlign: 'center',
      }}>
        {/* Icon */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-dashboard-card)',
          backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-4)',
        }}>
          <Heart size={24} color="var(--color-error)" />
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: 'var(--text-h4)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-2)',
        }}>
          Apple Health Sync
        </h3>

        {/* Description */}
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-4)',
          maxWidth: 360,
          margin: '0 auto var(--space-4)',
          lineHeight: 1.6,
        }}>
          Connect workouts, sleep, and activity data from Apple Health.
        </p>

        {/* Coming Soon badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-2) var(--space-4)',
          backgroundColor: 'var(--surface-2)',
          borderRadius: 'var(--radius-button)',
          border: '1px solid var(--surface-3)',
        }}>
          <Clock size={14} color="var(--text-secondary)" />
          <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Coming Soon
          </span>
        </div>
      </div>

    </div>
  );
}
