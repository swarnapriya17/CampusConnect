import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export function EmptyState({ title = 'No Data Found', message = 'There are no records to display at this time.', icon: Icon = Inbox, actionText, onAction }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: 'var(--space-10) var(--space-4)',
      backgroundColor: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--color-border-strong)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-slate-100)',
        color: 'var(--color-slate-500)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 'var(--space-3)'
      }}>
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--color-slate-800)', margin: '0 0 var(--space-1) 0' }}>{title}</h4>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-500)', maxWidth: '400px', margin: '0 0 var(--space-4) 0' }}>{message}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
