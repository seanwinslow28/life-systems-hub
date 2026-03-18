import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wallet, Dumbbell, CheckSquare, BookOpen, Settings } from 'lucide-react';
import { USER_PROFILE } from '../data.js';

const NAV_ITEMS = [
  { label: 'Hub', to: '/', icon: Home },
  { label: 'Finances', to: '/finances', icon: Wallet },
  { label: 'Fitness', to: '/fitness', icon: Dumbbell },
  { label: 'Habits', to: '/habits', icon: CheckSquare },
  { label: 'Vault', to: '/vault', icon: BookOpen },
  { label: 'Settings', to: '/settings', icon: Settings },
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
  const profile = USER_PROFILE;

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
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
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
                minHeight: '44px',
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
              <Icon size={20} style={{ flexShrink: 0 }} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User profile footer — updates with level changes */}
      <div style={{
        padding: 'var(--space-3)',
        borderTop: '1px solid var(--surface-3)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        {/* Avatar */}
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
          <div style={{
            fontSize: 'var(--text-small)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}>
            {profile.name}
          </div>
          <div style={{
            fontSize: 'var(--text-caption)',
            color: 'var(--text-tertiary)',
            lineHeight: 1.3,
          }}>
            {profile.levelTitle} · Lv. {profile.level}
          </div>
        </div>
      </div>
    </aside>
  );
}
