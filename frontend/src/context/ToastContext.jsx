import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Floating Toast Notification Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        maxWidth: '380px',
        width: '100%'
      }}>
        {toasts.map((toast) => {
          let bg = 'var(--color-primary-900)';
          let border = 'var(--color-primary-600)';
          let icon = 'ℹ️';

          if (toast.type === 'success') {
            bg = 'var(--color-slate-900)';
            border = 'var(--color-success-600)';
            icon = '✅';
          } else if (toast.type === 'error') {
            bg = 'var(--color-slate-900)';
            border = 'var(--color-danger-600)';
            icon = '⚠️';
          } else if (toast.type === 'warning') {
            bg = 'var(--color-slate-900)';
            border = 'var(--color-warning-600)';
            icon = '🔔';
          }

          return (
            <div
              key={toast.id}
              style={{
                pointerEvents: 'auto',
                backgroundColor: bg,
                color: '#ffffff',
                borderLeft: `4px solid ${border}`,
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                fontSize: 'var(--text-sm)',
                animation: 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{icon}</span>
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-slate-400)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '0 4px'
                }}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
