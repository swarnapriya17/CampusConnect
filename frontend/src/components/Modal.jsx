import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from './Button';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '560px'
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9000,
      padding: 'var(--space-4)'
    }}>
      <div style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        width: '100%',
        maxWidth,
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--color-border-subtle)',
        overflow: 'hidden',
        animation: 'modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, fontWeight: 'var(--font-weight-semibold)' }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-slate-400)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'var(--space-6)', overflowY: 'auto', flex: 1 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: 'var(--space-4) var(--space-6)',
            borderTop: '1px solid var(--color-border-subtle)',
            backgroundColor: 'var(--color-slate-50)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 'var(--space-3)'
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger'
}) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="440px"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-danger-50)',
          color: 'var(--color-danger-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <AlertTriangle size={22} />
        </div>
        <div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-700)', margin: 0 }}>
            {message}
          </p>
        </div>
      </div>
    </Modal>
  );
}

export default Modal;
