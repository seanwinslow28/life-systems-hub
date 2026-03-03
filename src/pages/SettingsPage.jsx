import React from 'react';

export default function SettingsPage() {
  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 700, margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          Settings
        </h1>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>App preferences and configuration</p>
      </div>

      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-8)',
        textAlign: 'center',
        color: 'var(--text-tertiary)',
      }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto var(--space-4)' }}>
          <circle cx="24" cy="24" r="6"/>
          <path d="M24 6v3M24 39v3M6 24h3M39 24h3M10.9 10.9l2.1 2.1M34.9 34.9l2.1 2.1M10.9 37.1l2.1-2.1M34.9 13.1l2.1-2.1"/>
        </svg>
        <p style={{ fontSize: 'var(--text-small)' }}>Settings coming soon</p>
      </div>
    </div>
  );
}
