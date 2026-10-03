import React from 'react';

/**
 * Reusable Badge component for statuses (Good/Warning/Low, Pending/Submitted/Overdue, etc.)
 */
export function Badge({
  children,
  variant = 'primary', // primary, success, warning, danger, neutral, info
  size = 'md',        // sm, md
  className = '',
  style = {}
}) {
  const variantStyles = {
    primary: { backgroundColor: 'var(--color-primary-100)', color: 'var(--color-primary-800)' },
    success: { backgroundColor: 'var(--color-success-100)', color: 'var(--color-success-700)' },
    warning: { backgroundColor: 'var(--color-warning-100)', color: 'var(--color-warning-700)' },
    danger:  { backgroundColor: 'var(--color-danger-100)',  color: 'var(--color-danger-700)' },
    neutral: { backgroundColor: 'var(--color-slate-100)',   color: 'var(--color-slate-700)' },
    info:    { backgroundColor: 'var(--color-primary-50)',    color: 'var(--color-primary-700)', border: '1px solid var(--color-primary-200)' }
  };

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 10px', fontSize: '12px' }
  };

  return (
    <span
      className={`badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontWeight: 'var(--font-weight-semibold)',
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style
      }}
    >
      {children}
    </span>
  );
}

export default Badge;
