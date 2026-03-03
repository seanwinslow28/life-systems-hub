import React from 'react';

export default function Card({ children, style, ...props }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
