import React, { useState, useEffect, useRef } from 'react';
import { XP_LEVELS } from '../data.js';

export default function XPBar({ currentXP, maxXP, levelStart, level, levelTitle }) {
  // XP within current level (not cumulative)
  const xpInLevel = currentXP - levelStart;
  const xpNeeded = maxXP - levelStart;
  const percentage = Math.min(Math.max((xpInLevel / xpNeeded) * 100, 0), 100);
  const xpToNext = maxXP - currentXP;

  // Find next level title
  const nextLevel = XP_LEVELS.find((l) => l.level === level + 1);
  const nextTitle = nextLevel ? nextLevel.title : 'Max';

  // Animation state
  const [scale, setScale] = useState(0);
  const [isGlowing, setIsGlowing] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);
  const prevPercentage = useRef(percentage);

  // Initial mount animation
  useEffect(() => {
    const t = setTimeout(() => setScale(percentage / 100), 50);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle XP changes and level-up detection
  useEffect(() => {
    if (percentage === prevPercentage.current) return;

    // Level-up: if percentage wraps back below previous (new level started)
    // For now, just animate to new percentage
    setScale(percentage / 100);
    prevPercentage.current = percentage;
  }, [percentage]);

  // Level-up celebration trigger (called externally or when level changes)
  const [displayLevel, setDisplayLevel] = useState(level);
  const [displayTitle, setDisplayTitle] = useState(levelTitle);

  useEffect(() => {
    if (level > displayLevel) {
      // Level up! Run celebration sequence
      // Step 1: Fill to 100%
      setScale(1);
      // Step 2: Glow pulse after fill completes
      const glowTimer = setTimeout(() => {
        setIsGlowing(true);
      }, 600);
      // Step 3: Reset bar + update title
      const resetTimer = setTimeout(() => {
        setIsGlowing(false);
        setScale(0);
        setDisplayLevel(level);
        setDisplayTitle(levelTitle);
        setBadgePulse(true);
      }, 1400); // 600ms fill + 800ms glow
      // Step 4: Animate to new percentage
      const fillTimer = setTimeout(() => {
        setScale(percentage / 100);
        setBadgePulse(false);
      }, 1650); // 1400 + 200ms fade + 50ms buffer

      return () => {
        clearTimeout(glowTimer);
        clearTimeout(resetTimer);
        clearTimeout(fillTimer);
      };
    } else {
      setDisplayLevel(level);
      setDisplayTitle(levelTitle);
    }
  }, [level]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%' }}>
      {/* Title row with level badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Level badge — 32x32, 6px radius, blue bg */}
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-button)',
            backgroundColor: 'var(--color-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 'var(--text-small)',
            fontWeight: 600,
            flexShrink: 0,
            transform: badgePulse ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 300ms ease-out',
          }}>
            {displayLevel}
          </div>
          {/* Level N — Title */}
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Level {displayLevel}
            </span>
            <span style={{ fontSize: 'var(--text-body)', color: 'var(--text-tertiary)' }}>—</span>
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 500, color: 'var(--text-secondary)' }}>
              {displayTitle}
            </span>
          </span>
        </div>
        {/* XP counter */}
        <span style={{
          fontSize: 'var(--text-small)',
          fontFamily: 'var(--font-mono)',
          fontVariantNumeric: 'tabular-nums lining-nums',
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-1)',
        }}>
          <span style={{ color: 'var(--text-primary)' }}>{currentXP.toLocaleString()}</span>
          <span style={{ color: 'var(--text-tertiary)' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{maxXP.toLocaleString()} XP</span>
        </span>
      </div>

      {/* Bar track — 8px height, 4px radius per spec */}
      <div
        style={{
          width: '100%',
          height: 8,
          backgroundColor: 'var(--surface-2)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={currentXP}
        aria-valuemin={levelStart}
        aria-valuemax={maxXP}
        aria-label={`Level ${displayLevel}: ${currentXP.toLocaleString()} of ${maxXP.toLocaleString()} XP`}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--color-primary)',
            borderRadius: 4,
            transform: `scaleX(${scale})`,
            transformOrigin: 'left',
            transition: 'transform 600ms ease-out',
            willChange: 'transform',
            boxShadow: isGlowing
              ? '0 0 12px color-mix(in srgb, var(--color-primary) 30%, transparent)'
              : 'none',
          }}
        />
      </div>

      {/* Subtitle — XP to next title */}
      <div style={{
        fontSize: 'var(--text-small)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
        gap: 'var(--space-1)',
      }}>
        <span style={{ color: 'var(--text-secondary)' }}>{xpToNext.toLocaleString()} XP to</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{nextTitle}</span>
      </div>
    </div>
  );
}
