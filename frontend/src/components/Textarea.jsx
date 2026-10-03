import React from 'react';

export function Textarea({
  label,
  error,
  rows = 4,
  placeholder,
  value,
  onChange,
  required = false,
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
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '0.625rem 0.875rem',
          fontSize: 'var(--text-sm)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--color-danger-600)' : 'var(--color-border-strong)'}`,
          backgroundColor: 'var(--color-bg-surface)',
          color: 'var(--color-text-primary)',
          outline: 'none',
          fontFamily: 'inherit',
          resize: 'vertical'
        }}
        {...props}
      />
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-600)' }}>{error}</span>}
    </div>
  );
}

export default Textarea;
