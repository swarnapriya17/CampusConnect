import React from 'react';
export { Select } from './Select';
export { Textarea } from './Textarea';

export function Input({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  style = {},
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', marginBottom: '14px', ...style }}>
      {label && (
        <label style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-700)' }}>
          {label} {required && <span style={{ color: 'var(--color-danger-600)' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <div style={{ position: 'absolute', left: '12px', color: 'var(--color-slate-400)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`form-input ${className}`}
          style={{
            width: '100%',
            padding: Icon ? '0.625rem 0.875rem 0.625rem 2.5rem' : '0.625rem 0.875rem',
            fontSize: 'var(--text-sm)',
            borderRadius: 'var(--radius-md)',
            border: `1px solid ${error ? 'var(--color-danger-600)' : 'var(--color-border-strong)'}`,
            backgroundColor: 'var(--color-bg-surface)',
            color: 'var(--color-text-primary)',
            outline: 'none',
            transition: 'var(--transition-fast)'
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-600)' }}>{error}</span>}
      {helperText && !error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>{helperText}</span>}
    </div>
  );
}

export default Input;
