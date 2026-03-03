import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    label: 'Hub',
    to: '/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M7 18V10h6v8"/>
      </svg>
    ),
  },
  {
    label: 'Finances',
    to: '/finances',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8"/>
        <path d="M10 6v1m0 6v1M8 9.5c0-.83.67-1.5 1.5-1.5h1a1.5 1.5 0 010 3h-1a1.5 1.5 0 000 3h1c.83 0 1.5-.67 1.5-1.5"/>
      </svg>
    ),
  },
  {
    label: 'Fitness',
    to: '/fitness',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10h2m12 0h2M4 10a2 2 0 012-2h.5M16 10a2 2 0 00-2-2h-.5M6.5 8V6a1 1 0 011-1h1a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2M13.5 8V6a1 1 0 00-1-1h-1a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1v-2"/>
      </svg>
    ),
  },
  {
    label: 'Habits',
    to: '/habits',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2"/>
        <path d="M7 10l2 2 4-4"/>
      </svg>
    ),
  },
  {
    label: 'Vault',
    to: '/vault',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 2h9l3 3v13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"/>
        <path d="M13 2v4h4M7 9h6M7 12h4"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="2.5"/>
        <path d="M10 2.5v1.2M10 16.3v1.2M2.5 10h1.2M16.3 10h1.2M4.7 4.7l.85.85M14.45 14.45l.85.85M4.7 15.3l.85-.85M14.45 5.55l.85-.85"/>
      </svg>
    ),
  },
];

// Inline logo SVG
function Logo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-4) var(--space-3) var(--space-3)',
      borderBottom: '1px solid var(--surface-3)',
      marginBottom: 'var(--space-2)',
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-label="Life Systems Hub logo">
        <rect width="28" height="28" rx="6" fill="color-mix(in srgb, var(--color-primary) 15%, transparent)"/>
        <path d="M14 6L22 14L14 22L6 14Z" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="2.5" fill="var(--color-primary)"/>
        <path d="M14 6L14 8" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontSize: 'var(--text-small)',
        fontWeight: 600,
        color: 'var(--text-primary)',
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}>Life Systems</span>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      height: '100dvh',
      backgroundColor: 'var(--surface-1)',
      borderRight: '1px solid var(--surface-3)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      <Logo />
      <nav style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        padding: 'var(--space-2) var(--space-3)',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
      }}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: '8px 12px',
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-small)',
              fontWeight: isActive ? 500 : 400,
              color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'color-mix(in srgb, var(--color-primary) 10%, transparent)' : 'transparent',
              textDecoration: 'none',
              transition: 'color 150ms ease, background-color 150ms ease',
              minHeight: '40px',
              flexShrink: 0,
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--surface-2) 50%, transparent)';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.getAttribute('aria-current')) {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{
        padding: 'var(--space-3)',
        borderTop: '1px solid var(--surface-3)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'color-mix(in srgb, var(--color-primary) 20%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-primary)',
          fontWeight: 600,
          fontSize: 'var(--text-small)',
          flexShrink: 0,
        }}>S</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.3 }}>Sean</div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', lineHeight: 1.3 }}>Veteran · Lv. 4</div>
        </div>
      </div>
    </aside>
  );
}
