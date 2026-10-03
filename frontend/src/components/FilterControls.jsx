import React from 'react';
import { Filter } from 'lucide-react';

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
              type="button"
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

export default FilterControls;
