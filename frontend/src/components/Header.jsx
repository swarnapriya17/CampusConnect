import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, Shield, User, GraduationCap, ChevronDown, Check } from 'lucide-react';

export function Header({ onToggleMobile }) {
  const { role, switchRole, user } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--color-bg-surface)',
      borderBottom: '1px solid var(--color-border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      padding: '0 var(--space-6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: 'var(--shadow-xs)'
    }}>
      {/* Left: Mobile Toggle & Quick Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button
          onClick={onToggleMobile}
          className="mobile-menu-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-slate-700)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Menu size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-slate-400)' }}>
            Portal Mode:
          </span>
          <span className={`badge ${role === 'student' ? 'badge-primary' : 'badge-warning'}`}>
            {role === 'student' ? 'Student Workspace' : role === 'faculty' ? 'Faculty Portal' : 'Admin Operations'}
          </span>
        </div>
      </div>

      {/* Right: Stage 2 Role Switcher Dropdown & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        {/* Quick Role Switcher for Stage 2 Review */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-slate-100)',
              border: '1px solid var(--color-slate-300)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-slate-800)',
              cursor: 'pointer'
            }}
          >
            <Shield size={14} style={{ color: 'var(--color-primary-600)' }} />
            <span>Switch Role (Stage 2 Preview)</span>
            <ChevronDown size={14} />
          </button>

          {showRoleDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '110%',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-lg)',
              padding: '6px',
              width: '210px',
              zIndex: 100
            }}>
              <div style={{ padding: '6px 10px', fontSize: '11px', color: 'var(--color-slate-400)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-bold)' }}>
                Select Active User Role
              </div>
              <button
                onClick={() => { switchRole('student'); setShowRoleDropdown(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: role === 'student' ? 'var(--color-primary-50)' : 'transparent',
                  color: role === 'student' ? 'var(--color-primary-900)' : 'var(--color-slate-700)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: role === 'student' ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={14} /> Student View
                </div>
                {role === 'student' && <Check size={14} style={{ color: 'var(--color-primary-600)' }} />}
              </button>

              <button
                onClick={() => { switchRole('faculty'); setShowRoleDropdown(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: role === 'faculty' ? 'var(--color-primary-50)' : 'transparent',
                  color: role === 'faculty' ? 'var(--color-primary-900)' : 'var(--color-slate-700)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: role === 'faculty' ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={14} /> Faculty View
                </div>
                {role === 'faculty' && <Check size={14} style={{ color: 'var(--color-primary-600)' }} />}
              </button>

              <button
                onClick={() => { switchRole('admin'); setShowRoleDropdown(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: role === 'admin' ? 'var(--color-primary-50)' : 'transparent',
                  color: role === 'admin' ? 'var(--color-primary-900)' : 'var(--color-slate-700)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: role === 'admin' ? 'var(--font-weight-bold)' : 'var(--font-weight-normal)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shield size={14} /> Admin View
                </div>
                {role === 'admin' && <Check size={14} style={{ color: 'var(--color-primary-600)' }} />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-slate-600)',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: '6px'
            }}
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-danger-600)',
              borderRadius: '50%'
            }} />
          </button>
        </div>

        {/* User Profile Thumbnail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <img
            src={user?.avatar}
            alt={user?.name}
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-slate-300)' }}
          />
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-800)' }}>
            {user?.name}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
