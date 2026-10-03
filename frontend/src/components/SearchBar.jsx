import React from 'react';
import { Search, X } from 'lucide-react';

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
          type="button"
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

export default SearchBar;
