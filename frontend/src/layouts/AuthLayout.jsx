import React from 'react';
import { Outlet } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

export function AuthLayout() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-slate-900)',
      padding: 'var(--space-4)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Subtle Gradient Blobs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary-900)',
        filter: 'blur(100px)',
        opacity: 0.5
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        zIndex: 1,
        animation: 'fadeIn 0.3s ease'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--color-primary-800)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-3) auto',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <GraduationCap size={32} />
          </div>
          <h1 style={{ color: '#ffffff', fontSize: 'var(--text-3xl)', margin: 0, fontWeight: 'var(--font-weight-bold)' }}>
            CampusConnect
          </h1>
          <p style={{ color: 'var(--color-slate-400)', fontSize: 'var(--text-xs)', marginTop: '4px' }}>
            One Campus. One Connected Experience.
          </p>
        </div>

        <Outlet />

        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>
          &copy; {new Date().getFullYear()} CampusConnect Academic Operations System
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
