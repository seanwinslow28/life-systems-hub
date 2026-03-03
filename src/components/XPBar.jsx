import React, { useState, useEffect } from 'react';

export default function XPBar({ currentXP, maxXP, levelStart, level, levelTitle }) {
  // XP within current level (not cumulative)
  const xpInLevel = currentXP - levelStart;
  const xpNeeded = maxXP - levelStart;
  const percentage = Math.min(Math.max((xpInLevel / xpNeeded) * 100, 0), 100);
  const xpToNext = maxXP - currentXP;

  // Start at 0 then animate to percentage
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percentage), 50);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Also handle XP changes (e.g., when habits are completed)
  useEffect(() => {
    setWidth(percentage);
  }, [percentage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', width: '100%' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)' }}>
          Level {level} · {levelTitle}
        </span>
        <span style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)',
          fontVariantNumeric: 'tabular-nums lining-nums',
        }}>
          {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
        </span>
      </div>

      {/* Bar track */}
      <div
        style={{
          width: '100%',
          height: '10px',
          backgroundColor: 'var(--surface-2)',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
        role="progressbar"
        aria-valuenow={currentXP}
        aria-valuemin={levelStart}
        aria-valuemax={maxXP}
        aria-label={`Level ${level}: ${currentXP.toLocaleString()} of ${maxXP.toLocaleString()} XP`}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            backgroundColor: 'var(--color-primary)',
            borderRadius: '999px',
            transition: 'width 600ms ease-out',
            boxShadow: width > 0 ? '0 0 8px color-mix(in srgb, var(--color-primary) 60%, transparent)' : 'none',
          }}
        />
      </div>

      {/* Footer */}
      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
        {xpToNext.toLocaleString()} XP to Elite
      </div>
    </div>
  );
}
