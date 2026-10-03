import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export function ProgressBar({ value = 0, max = 100, color = 'primary', showLabel = true, height = '8px' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  let barBg = 'var(--color-primary-600)';
  if (color === 'success' || percentage >= 75) barBg = 'var(--color-success-600)';
  if (color === 'warning' || (percentage >= 65 && percentage < 75)) barBg = 'var(--color-warning-600)';
  if (color === 'danger' || percentage < 65) barBg = 'var(--color-danger-600)';

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
          <span style={{ color: 'var(--color-slate-600)', fontWeight: 'var(--font-weight-medium)' }}>Progress</span>
          <span style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-slate-800)' }}>{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div style={{ width: '100%', height, backgroundColor: 'var(--color-slate-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: barBg, transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }} />
      </div>
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search records...', onClear }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
      <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-slate-400)' }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.5rem 2.25rem 0.5rem 2.35rem',
          fontSize: 'var(--text-sm)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-strong)',
          backgroundColor: '#ffffff',
          outline: 'none'
        }}
      />
      {value && (
        <button
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--color-slate-400)',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export function FilterControls({ options = [], activeFilter, onSelectFilter, label = 'Filter' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Filter size={14} /> {label}:
      </span>
      <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-slate-100)', padding: '3px', borderRadius: 'var(--radius-md)' }}>
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          const isActive = activeFilter === val;
          return (
            <button
              key={val}
              onClick={() => onSelectFilter(val)}
              style={{
                border: 'none',
                backgroundColor: isActive ? '#ffffff' : 'transparent',
                color: isActive ? 'var(--color-primary-900)' : 'var(--color-slate-600)',
                fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                transition: 'var(--transition-fast)'
              }}
            >
              {lbl}
            </button>
          );
        })}
      </div>
    </div>
  );
}
