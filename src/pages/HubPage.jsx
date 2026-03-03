import React, { useState } from 'react';
import { USER_PROFILE, HABITS_TODAY, XP_TODAY, XP_SOURCES } from '../data.js';
import XPBar from '../components/XPBar.jsx';
import MetricCard from '../components/MetricCard.jsx';
import { useToast } from '../components/Toast.jsx';

function QuestItem({ habit, onComplete }) {
  const [animating, setAnimating] = useState(false);

  const handleCheck = () => {
    if (habit.completed) return;
    setAnimating(true);
    onComplete(habit.id, habit.xpReward);
    setTimeout(() => setAnimating(false), 300);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '10px var(--space-4)',
        borderRadius: 'var(--radius-button)',
        transition: 'background-color 150ms ease',
        cursor: habit.completed ? 'default' : 'pointer',
      }}
      onMouseEnter={(e) => {
        if (!habit.completed) e.currentTarget.style.backgroundColor = 'var(--surface-2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={handleCheck}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: habit.completed ? 'none' : '1.5px solid var(--surface-3)',
          backgroundColor: habit.completed ? 'var(--color-primary)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 200ms ease, border-color 200ms ease',
          transform: animating ? 'scale(0.9)' : 'scale(1)',
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
            style={{ animation: 'check-fill 200ms ease forwards' }}
          >
            <path d="M2 6l3 3 5-5"/>
          </svg>
        )}
      </div>

      {/* Label */}
      <span style={{
        fontSize: 'var(--text-small)',
        color: habit.completed ? 'var(--text-tertiary)' : 'var(--text-primary)',
        textDecoration: habit.completed ? 'line-through' : 'none',
        flex: 1,
        transition: 'color 200ms ease',
      }}>
        {habit.name}
      </span>

      {/* XP badge */}
      <span style={{
        fontSize: 'var(--text-caption)',
        fontFamily: 'var(--font-mono)',
        color: habit.completed ? 'var(--text-tertiary)' : 'var(--color-primary)',
        backgroundColor: habit.completed
          ? 'color-mix(in srgb, var(--surface-3) 30%, transparent)'
          : 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
        padding: '2px 8px',
        borderRadius: '999px',
        whiteSpace: 'nowrap',
        transition: 'all 200ms ease',
      }}>
        +{habit.xpReward} XP
      </span>
    </div>
  );
}

export default function HubPage() {
  const { addToast } = useToast();
  const [habits, setHabits] = useState(HABITS_TODAY);
  const [earnedXP, setEarnedXP] = useState(XP_TODAY);
  const profile = USER_PROFILE;

  const completedCount = habits.filter((h) => h.completed).length;

  const handleComplete = (id, xpReward) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: true } : h))
    );
    setEarnedXP((prev) => prev + xpReward);
    addToast(`+${xpReward} XP earned`, 'xp');
  };

  // Streak glow: milestone every 7 days
  const isStreakMilestone = profile.streak % 7 === 0;

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
              Good morning, {profile.name}
            </h1>
            {/* Level badge */}
            <div style={{
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 15%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-primary) 30%, transparent)',
              borderRadius: 'var(--radius-button)',
              padding: '3px 10px',
              fontSize: 'var(--text-caption)',
              fontWeight: 600,
              color: 'var(--color-primary)',
              fontVariantNumeric: 'tabular-nums',
            }}>
              Lv. {profile.level}
            </div>
          </div>
          <div style={{
            fontSize: 'var(--text-small)',
            color: 'var(--text-secondary)',
          }}>
            {profile.todayDate} · {profile.levelTitle}
          </div>
        </div>

        {/* Streak display */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          backgroundColor: 'var(--surface-1)',
          border: '1px solid var(--surface-3)',
          borderRadius: 'var(--radius-dashboard-card)',
          padding: 'var(--space-4) var(--space-5)',
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="var(--color-accent)" opacity="0.9">
            <path d="M11 2C8 7 6 8 6 11.5A5 5 0 0016 11.5C16 8 14 7 11 2Z"/>
            <path d="M11 8C9.5 10.5 9 11.5 9 13A2 2 0 0013 13C13 11.5 12.5 10.5 11 8Z" fill="color-mix(in srgb, var(--color-accent) 50%, white)"/>
          </svg>
          <div>
            <div style={{
              fontSize: 'var(--text-h4)',
              fontWeight: 700,
              color: 'var(--color-accent)',
              fontVariantNumeric: 'tabular-nums',
              lineHeight: 1,
              animation: isStreakMilestone ? 'streak-glow 2s ease-in-out 1' : 'none',
            }}>
              {profile.streak}
            </div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', marginTop: 2 }}>
              day streak
            </div>
          </div>
          <div style={{
            backgroundColor: 'color-mix(in srgb, var(--color-accent) 15%, transparent)',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: 'var(--text-caption)',
            fontWeight: 600,
            color: 'var(--color-accent)',
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

      {/* Quick Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-6)',
      }}>
        <MetricCard
          label="Workouts This Week"
          value="2 / 3"
          sub="PPL split"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 8h1.5m9 0H14M4 8a1.5 1.5 0 011.5-1.5H6M12 8a1.5 1.5 0 00-1.5-1.5H10M6 6.5V5a.75.75 0 011.5 0v6A.75.75 0 016 11V9.5M10 6.5V5a.75.75 0 011.5 0v6A.75.75 0 0110 11V9.5"/>
            </svg>
          }
        />
        <MetricCard
          label="Budget Health"
          value="On Track"
          sub="$1,247 of $3,800"
          valueColor="var(--color-success)"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4z"/>
              <path d="M8 7v1m-1.5-1h3"/>
            </svg>
          }
        />
        <MetricCard
          label="Streak"
          value={`${profile.streak} days`}
          sub={`${profile.streakMultiplier}x multiplier active`}
          valueColor="var(--color-accent)"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="var(--color-accent)" opacity="0.8">
              <path d="M8 1.5C6 5 5 5.5 5 8A3 3 0 0011 8C11 5.5 10 5 8 1.5Z"/>
            </svg>
          }
        />
        <MetricCard
          label="XP Today"
          value={`+${earnedXP}`}
          sub={`${completedCount}/${habits.length} quests done`}
          valueColor="var(--color-primary)"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M8 2l1.8 3.6 4 .6-2.9 2.8.68 4L8 11l-3.58 1.88.68-4-2.9-2.8 4-.6z"/>
            </svg>
          }
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
              <path d="M13 5l-6 6-3-3"/>
            </svg>
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
