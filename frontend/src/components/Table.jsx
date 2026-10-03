import React from 'react';
import EmptyState from './EmptyState';

export function Table({
  columns = [],
  data = [],
  keyField = 'id',
  emptyMessage = 'No records found.',
  onRowClick
}) {
  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 'var(--text-sm)' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-slate-100)', borderBottom: '1px solid var(--color-border-strong)' }}>
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                style={{
                  padding: '0.75rem 1rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--color-slate-700)',
                  width: col.width || 'auto'
                }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rIdx) => (
            <tr
              key={row[keyField] || rIdx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{
                borderBottom: rIdx === data.length - 1 ? 'none' : '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-surface)',
                cursor: onRowClick ? 'pointer' : 'default',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-slate-50)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-bg-surface)';
              }}
            >
              {columns.map((col, cIdx) => (
                <td key={col.key || cIdx} style={{ padding: '0.875rem 1rem', color: 'var(--color-slate-800)', verticalAlign: 'middle' }}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
