import React from 'react';

export function Select({
  label,
  error,
  options = [],
  value,
  onChange,
  required = false,
  placeholder = 'Select option...',
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
      <select
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
          cursor: 'pointer'
        }}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={typeof opt === 'object' ? opt.value : opt} value={typeof opt === 'object' ? opt.value : opt}>
            {typeof opt === 'object' ? opt.label : opt}
          </option>
        ))}
      </select>
      {error && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-danger-600)' }}>{error}</span>}
    </div>
  );
}

export default Select;
