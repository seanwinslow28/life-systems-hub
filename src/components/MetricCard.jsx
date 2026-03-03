import React from 'react';

export default function MetricCard({ label, value, sub, icon, valueColor }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        transition: 'border-color 150ms ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-tertiary)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--surface-3)'; }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
        <span style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--text-secondary)',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>{label}</span>
        {icon && <span style={{ color: 'var(--text-tertiary)', opacity: 0.7 }}>{icon}</span>}
      </div>
      <div style={{
        fontSize: 'var(--text-h3)',
        lineHeight: 1.2,
        fontWeight: 600,
        color: valueColor || 'var(--text-primary)',
        fontVariantNumeric: 'tabular-nums lining-nums',
      }}>{value}</div>
      {sub && (
        <div style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--text-tertiary)',
          marginTop: 'var(--space-1)',
          lineHeight: 1.4,
        }}>{sub}</div>
      )}
    </div>
  );
}
