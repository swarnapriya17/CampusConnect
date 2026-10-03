import React from 'react';

export function Card({
  children,
  title,
  subtitle,
  action,
  className = '',
  style = {},
  padding = 'var(--space-6)',
  hover = false
}) {
  return (
    <div
      className={`card ${className}`}
      style={{
        padding,
        transition: hover ? 'var(--transition-fast)' : 'none',
        ...style
      }}
    >
      {(title || action) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: children ? 'var(--space-4)' : 0,
          gap: 'var(--space-4)'
        }}>
          <div>
            {title && <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, fontWeight: 'var(--font-weight-semibold)' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', margin: '4px 0 0 0' }}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function StatCard({ title, value, subtitle, icon: Icon, color = 'primary', change }) {
  const bgMap = {
    primary: 'var(--color-primary-50)',
    success: 'var(--color-success-50)',
    warning: 'var(--color-warning-50)',
    danger:  'var(--color-danger-50)'
  };
  const iconColorMap = {
    primary: 'var(--color-primary-600)',
    success: 'var(--color-success-600)',
    warning: 'var(--color-warning-600)',
    danger:  'var(--color-danger-600)'
  };

  return (
    <Card hover style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-slate-500)', fontWeight: 'var(--font-weight-medium)' }}>
            {title}
          </span>
          <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary-950)', margin: '4px 0' }}>
            {value}
          </div>
          {subtitle && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>{subtitle}</span>}
          {change && (
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: change.startsWith('+') ? 'var(--color-success-600)' : 'var(--color-danger-600)', marginLeft: '6px' }}>
              {change}
            </span>
          )}
        </div>
        {Icon && (
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: bgMap[color] || bgMap.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColorMap[color] || iconColorMap.primary
          }}>
            <Icon size={22} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default Card;
