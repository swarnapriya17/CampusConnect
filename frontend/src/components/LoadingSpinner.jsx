import React from 'react';

export function LoadingSpinner({ size = 'md', message = 'Loading contents...' }) {
  const sizeMap = { sm: 20, md: 36, lg: 54 };
  const pixels = sizeMap[size] || 36;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
      <div style={{
        width: `${pixels}px`,
        height: `${pixels}px`,
        border: '3px solid var(--color-slate-200)',
        borderTopColor: 'var(--color-primary-700)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      {message && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', marginTop: 'var(--space-3)' }}>{message}</p>}
    </div>
  );
}

export default LoadingSpinner;
