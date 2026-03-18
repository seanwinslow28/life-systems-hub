import React, { useState, useEffect, useCallback } from 'react';
import { Flame, Dumbbell, Wallet, Zap } from 'lucide-react';
import { USER_PROFILE, HABITS_TODAY, XP_TODAY, XP_SOURCES, XP_LEVELS } from '../data.js';
import XPBar from '../components/XPBar.jsx';
import MetricCard from '../components/MetricCard.jsx';

// ---- Greeting System (spec section 19) ----
function getGreeting(name) {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return `Good morning, ${name}`;
  if (hour >= 12 && hour < 18) return `Good afternoon, ${name}`;
  if (hour >= 18 && hour < 24) return `Good evening, ${name}`;
  return `Still at it, ${name}?`;
}

function getContextLine(profile, completedCount, totalHabits) {
  const hour = new Date().getHours();
  const remaining = totalHabits - completedCount;

  if (hour >= 5 && hour < 12) {
    // Morning: streak-focused
    if (profile.streak >= 10) return `${profile.streak}-day streak. Your best yet.`;
    return `${profile.streak}-day streak active.`;
  }
  if (hour >= 12 && hour < 18) {
    // Afternoon: quest progress
    return `${completedCount}/${totalHabits} quests done today.`;
  }
  if (hour >= 18 && hour < 24) {
    // Evening: remaining quests
    if (remaining === 0) return 'All quests complete. Well done.';
    return `${remaining} quest${remaining === 1 ? '' : 's'} remaining tonight.`;
  }
  // Late night: XP distance
  const nextLevel = XP_LEVELS.find((l) => l.level === profile.level + 1);
  if (nextLevel) {
    const xpToNext = nextLevel.cumulativeXP - profile.currentXP;
    return `${xpToNext.toLocaleString()} XP to ${nextLevel.title}.`;
  }
  return '';
}

// ---- Inline Feedback Component ----
function InlineFeedback({ message, visible, color }) {
  return (
    <span
      style={{
        fontSize: 'var(--text-small)',
        fontWeight: 500,
        color: color || 'var(--color-primary-muted)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-4px)',
        transition: visible
          ? 'opacity 200ms ease-out, transform 200ms ease-out'
          : 'opacity 300ms ease, transform 300ms ease',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        marginLeft: 'var(--space-3)',
      }}
      aria-live="polite"
    >
      {message}
    </span>
  );
}

// ---- Quest Item with Inline Feedback ----
function QuestItem({ habit, onComplete }) {
  const [animating, setAnimating] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCheck = () => {
    if (habit.completed) return;
    setAnimating(true);
    onComplete(habit.id, habit.xpReward);

    // Show inline feedback
    setFeedback(`+${habit.xpReward} XP · ${habit.name}`);
    setTimeout(() => setAnimating(false), 300);

    // Hide after 2.5s visible + 300ms fade
    setTimeout(() => setFeedback(null), 2800);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '10px var(--space-4)',
        height: 48,
        borderRadius: 'var(--radius-button)',
        transition: 'background-color 150ms ease',
        cursor: habit.completed ? 'default' : 'pointer',
      }}
      role="checkbox"
      aria-checked={habit.completed}
      aria-label={`${habit.name} — +${habit.xpReward} XP`}
      tabIndex={0}
      onMouseEnter={(e) => {
        if (!habit.completed) e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--surface-1) 50%, transparent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={handleCheck}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCheck();
        }
      }}
    >
      {/* Checkbox — 20x20, 4px rounded square */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: habit.completed ? '2px solid var(--color-primary)' : '2px solid var(--surface-3)',
          backgroundColor: habit.completed ? 'var(--color-primary)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 150ms ease, border-color 150ms ease',
        }}
      >
        {habit.completed && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="checkmark-draw"
          >
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </div>

      {/* Label — dims on completion per spec */}
      <span style={{
        fontSize: 'var(--text-body)',
        color: habit.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
        flex: 1,
        transition: 'color 200ms ease',
        fontWeight: 400,
      }}>
        {habit.name}
      </span>

      {/* Inline feedback (appears on completion) */}
      {feedback && (
        <InlineFeedback message={feedback} visible={!!feedback} />
      )}

      {/* XP value — turns blue when earned */}
      <span style={{
        fontSize: 'var(--text-small)',
        fontWeight: habit.completed ? 500 : 400,
        color: habit.completed ? 'var(--color-primary)' : 'var(--text-tertiary)',
        whiteSpace: 'nowrap',
        transition: 'color 200ms ease',
      }}>
        +{habit.xpReward} XP
      </span>
    </div>
  );
}

export default function HubPage() {
  const [habits, setHabits] = useState(HABITS_TODAY);
  const [earnedXP, setEarnedXP] = useState(XP_TODAY);
  const profile = USER_PROFILE;

  const completedCount = habits.filter((h) => h.completed).length;

  const handleComplete = useCallback((id, xpReward) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: true } : h))
    );
    setEarnedXP((prev) => prev + xpReward);
  }, []);

  // Greeting
  const greeting = getGreeting(profile.name);
  const contextLine = getContextLine(profile, completedCount, habits.length);

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 900, margin: '0 auto' }}>

      {/* Profile Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-8)',
        gap: 'var(--space-6)',
        flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-1)',
          }}>
            <h1 style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              {greeting}
            </h1>
          </div>
          <div style={{
            fontSize: 'var(--text-small)',
            color: 'var(--text-secondary)',
          }}>
            {contextLine}
          </div>
        </div>

        {/* Streak display — Lucide Flame, orange number, multiplier pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          backgroundColor: 'var(--surface-1)',
          border: '1px solid var(--surface-3)',
          borderRadius: 'var(--radius-dashboard-card)',
          padding: 'var(--space-4) var(--space-5)',
        }}>
          <Flame size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
          <div>
            <div style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 700,
              color: 'var(--color-accent-muted)',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
            }}>
              {profile.streak}
            </div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', marginTop: 2 }}>
              day streak
            </div>
          </div>
          {/* Multiplier pill — spec-approved game-style modifier exception */}
          <div style={{
            backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: 'var(--text-caption)',
            fontWeight: 600,
            color: 'var(--color-accent-muted)',
          }}>
            {profile.streakMultiplier}x
          </div>
        </div>
      </div>

      {/* XP Bar Section */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <XPBar
          currentXP={profile.currentXP}
          maxXP={profile.levelXPGoal}
          levelStart={profile.levelXPStart}
          level={profile.level}
          levelTitle={profile.levelTitle}
        />
      </div>

      {/* Quick Stats Row — Hero variant for streak */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}>
        {/* Hero: Current Streak — spans 2 columns */}
        <MetricCard
          hero
          label="Current Streak"
          value={`${profile.streak} days`}
          sub={profile.streak >= 10 ? 'Your best yet.' : `${profile.streakMultiplier}x multiplier active`}
          valueColor="var(--color-accent)"
          icon={<Flame size={24} />}
        />
        {/* Standard metrics */}
        <MetricCard
          label="Workouts This Week"
          value="2 / 3"
          sub="PPL split"
          icon={<Dumbbell size={16} />}
        />
        <MetricCard
          label="Budget Health"
          value="On Track"
          sub="$1,247 of $3,800"
          valueColor="var(--color-primary)"
          icon={<Wallet size={16} />}
        />
      </div>

      {/* Today's Quests */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--surface-3)',
        }}>
          <h2 style={{
            fontSize: 'var(--text-small)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <Zap size={16} color="var(--color-primary)" />
            Today's Quests
          </h2>
          <span style={{
            fontSize: 'var(--text-caption)',
            fontFamily: 'var(--font-mono)',
            color: completedCount === habits.length ? 'var(--color-success)' : 'var(--text-secondary)',
          }}>
            {completedCount}/{habits.length} completed
          </span>
        </div>

        <div style={{ padding: 'var(--space-2) 0' }}>
          {habits.map((habit) => (
            <QuestItem key={habit.id} habit={habit} onComplete={handleComplete} />
          ))}
        </div>
      </div>

    </div>
  );
}
