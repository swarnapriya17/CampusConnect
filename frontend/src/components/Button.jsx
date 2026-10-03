import React from 'react';

/**
 * Reusable Button component with explicit text labels, icon support, variants, sizes, and states.
 */
export function Button({
  children,
  variant = 'primary', // primary, outline, secondary, danger, success
  size = 'md',        // sm, md, lg
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  style = {},
  ...props
}) {
  let variantClass = 'btn-primary';
  if (variant === 'outline') variantClass = 'btn-outline';
  else if (variant === 'secondary') variantClass = 'btn-secondary';
  else if (variant === 'danger') variantClass = 'btn-danger';
  else if (variant === 'success') variantClass = 'btn-success';

  // Specific inline style overrides for variants if not in basic css
  const variantStyles = {
    secondary: {
      backgroundColor: 'var(--color-slate-200)',
      color: 'var(--color-slate-800)',
      border: '1px solid var(--color-slate-300)'
    },
    danger: {
      backgroundColor: 'var(--color-danger-600)',
      color: '#ffffff',
      border: '1px solid var(--color-danger-700)'
    },
    success: {
      backgroundColor: 'var(--color-success-600)',
      color: '#ffffff',
      border: '1px solid var(--color-success-700)'
    }
  };

  const sizeStyles = {
    sm: { padding: '0.375rem 0.75rem', fontSize: 'var(--text-xs)' },
    md: { padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' },
    lg: { padding: '0.75rem 1.5rem', fontSize: 'var(--text-base)' }
  };

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        opacity: disabled || isLoading ? 0.65 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        ...style
      }}
      {...props}
    >
      {isLoading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span className="spinner-sm" style={{
            width: '14px',
            height: '14px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.8s linear infinite'
          }} />
          <span>Processing...</span>
        </span>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
        </>
      )}
    </button>
  );
}

export default Button;
