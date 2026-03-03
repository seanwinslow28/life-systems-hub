import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  const addToast = useCallback((message, type = 'xp') => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          bottom: 'var(--space-6)',
          right: 'var(--space-6)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          pointerEvents: 'none',
        }}
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              backgroundColor: 'var(--surface-2)',
              border: '1px solid var(--surface-3)',
              borderRadius: 'var(--radius-button)',
              padding: '10px 16px',
              fontSize: 'var(--text-small)',
              fontWeight: 500,
              color: toast.type === 'xp' ? 'var(--color-primary)' : toast.type === 'levelup' ? 'var(--color-accent)' : 'var(--text-primary)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              animation: 'toast-in 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              whiteSpace: 'nowrap',
            }}
          >
            {toast.type === 'xp' && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 2l1.4 2.9 3.1.4-2.25 2.2.53 3.1L7 9l-2.78 1.6.53-3.1L2.5 5.3l3.1-.4z"/>
              </svg>
            )}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
