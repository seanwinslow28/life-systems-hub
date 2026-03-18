import React from 'react';

/**
 * MetricCard — Standard and Hero variants.
 *
 * Props:
 *   label       — Caption label above value
 *   value       — Primary display value (Inter SemiBold, NOT JetBrains Mono)
 *   sub         — Optional subtitle below value
 *   icon        — Optional Lucide icon (rendered at 24px for hero, 16px for standard)
 *   valueColor  — Optional value color override
 *   hero        — Boolean: hero variant (larger, spans 2 columns in parent grid)
 *   trend       — Optional: { value: "+12%", direction: "up"|"down" }
 *   positiveDirection — "up"|"down" (determines trend color logic)
 */
export default function MetricCard({ label, value, sub, icon, valueColor, hero = false, trend, positiveDirection = 'up' }) {
  const isPositive = trend?.direction === positiveDirection;
  const trendColor = trend?.direction === 'up'
    ? (positiveDirection === 'up' ? 'var(--color-success)' : 'var(--color-error)')
    : (positiveDirection === 'down' ? 'var(--color-success)' : 'var(--color-error)');

  return (
    <div
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: hero ? 'var(--space-6)' : 'var(--space-5)',
        transition: 'border-color 150ms ease',
        cursor: 'default',
        minHeight: hero ? 140 : 100,
        gridColumn: hero ? 'span 2' : undefined,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-3)'; }}
    >
      {/* Icon for hero variant */}
      {hero && icon && (
        <div style={{
          color: 'var(--color-primary)',
          marginBottom: 'var(--space-3)',
        }}>
          {icon}
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 'var(--space-2)',
      }}>
        <span style={{
          fontSize: 'var(--text-small)',
          color: 'var(--text-secondary)',
          fontWeight: 400,
        }}>{label}</span>
        {!hero && icon && <span style={{ color: 'var(--text-tertiary)', opacity: 0.7 }}>{icon}</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)' }}>
        <div style={{
          fontSize: hero ? 'var(--text-h2)' : 'var(--text-h3)',
          lineHeight: 1.2,
          fontWeight: 600,
          color: valueColor || 'var(--text-primary)',
          fontVariantNumeric: 'tabular-nums lining-nums',
        }}>{value}</div>
        {trend && (
          <span style={{
            fontSize: 'var(--text-caption)',
            fontWeight: 500,
            color: trendColor,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>

      {sub && (
        <div style={{
          fontSize: hero ? 'var(--text-small)' : 'var(--text-caption)',
          color: 'var(--text-secondary)',
          marginTop: 'var(--space-2)',
          lineHeight: 1.4,
        }}>{sub}</div>
      )}
    </div>
  );
}
