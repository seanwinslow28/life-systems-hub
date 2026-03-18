import React from 'react';
import { Terminal, ClipboardList, Palette, Activity, PenTool, Database } from 'lucide-react';
import { VAULT_STATS, VAULT_MOCS } from '../data.js';

// Map MOC names to Lucide icons (replacing emoji per spec: "No emoji in UI. Lucide only.")
const MOC_ICONS = {
  'Claude Mastery': Terminal,
  'Product Management': ClipboardList,
  'Creative Studio': Palette,
  'Life Systems': Activity,
  'Design Team': PenTool,
  'Vault': Database,
};

function StatCard({ label, value }) {
  return (
    <div style={{
      backgroundColor: 'var(--surface-1)',
      border: '1px solid var(--surface-3)',
      borderRadius: 'var(--radius-dashboard-card)',
      padding: 'var(--space-5)',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 'var(--text-h2)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1.1,
        marginBottom: 'var(--space-2)',
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function MOCCard({ moc }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        cursor: 'pointer',
        transition: 'border-color 150ms ease, transform 150ms ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = moc.color;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--surface-3)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Color accent bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: moc.color,
        opacity: 0.7,
      }}/>

      <div style={{ marginTop: 'var(--space-2)' }}>
        {(() => {
          const IconComponent = MOC_ICONS[moc.name];
          return IconComponent
            ? <IconComponent size={20} style={{ color: moc.color, marginBottom: 'var(--space-2)' }} />
            : <Database size={20} style={{ color: moc.color, marginBottom: 'var(--space-2)' }} />;
        })()}
        <h3 style={{
          fontSize: 'var(--text-small)',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--space-1)',
          lineHeight: 1.3,
        }}>
          {moc.name}
        </h3>
        <div style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-mono)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {moc.notes.toLocaleString()} notes
        </div>
      </div>
    </div>
  );
}

export default function VaultPage() {
  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 900, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          Vault
        </h1>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>Obsidian knowledge base overview</p>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <StatCard label="Vault Notes" value={VAULT_STATS.totalNotes} />
        <StatCard label="Inbox Items" value={VAULT_STATS.inbox} />
        <StatCard label="Active Projects" value={VAULT_STATS.activeProjects} />
      </div>

      {/* MOC Grid */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
          Maps of Content
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
          {VAULT_MOCS.map((moc) => (
            <MOCCard key={moc.id} moc={moc} />
          ))}
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-button)',
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 2h9l3 3v13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/>
            <path d="M13 2v4h4M7 9h6M7 12h4"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 3 }}>
            Full Vault Integration
          </div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 'none' }}>
            Coming soon — will connect to Obsidian Local REST API for live note counts, inbox triage, and project dashboards.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
          <div
            className="pulse-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
            }}
          />
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Coming Soon</span>
        </div>
      </div>

    </div>
  );
}
