import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" message="Verifying authentication session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function RoleProtectedRoute({ allowedRoles = [] }) {
  const { role, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner size="lg" message="Checking role permissions..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return (
      <div style={{
        padding: 'var(--space-12) var(--space-4)',
        textAlign: 'center',
        maxWidth: '540px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: 'var(--text-4xl)',
          marginBottom: 'var(--space-2)'
        }}>
          🚫
        </div>
        <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-danger-700)', marginBottom: 'var(--space-2)' }}>
          Access Denied — Unauthorized Role
        </h2>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-600)', marginBottom: 'var(--space-6)' }}>
          You do not have permission to view administrative governance pages. Your active workspace role is <strong>{role.toUpperCase()}</strong>.
        </p>
        <a
          href={role === 'student' ? '/student/dashboard' : '/admin/dashboard'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.625rem 1.25rem',
            backgroundColor: 'var(--color-primary-800)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 'var(--font-weight-medium)',
            fontSize: 'var(--text-sm)'
          }}
        >
          Return to My Workspace Dashboard
        </a>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
