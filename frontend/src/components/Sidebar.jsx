import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarCheck2,
  FileCheck2,
  FileText,
  Megaphone,
  Calendar,
  MessageSquareWarning,
  Users,
  LogOut,
  GraduationCap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ isMobileOpen, onCloseMobile }) {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentNavItems = [
    { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/student/profile', icon: User },
    { label: 'Subjects', path: '/student/subjects', icon: BookOpen },
    { label: 'Attendance', path: '/student/attendance', icon: CalendarCheck2 },
    { label: 'Assignments', path: '/student/assignments', icon: FileCheck2 },
    { label: 'Announcements', path: '/student/announcements', icon: Megaphone },
    { label: 'Events', path: '/student/events', icon: Calendar },
    { label: 'Requests & Complaints', path: '/student/requests', icon: MessageSquareWarning }
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students', path: '/admin/students', icon: Users },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Attendance', path: '/admin/attendance', icon: CalendarCheck2 },
    { label: 'Assignments', path: '/admin/assignments', icon: FileCheck2 },
    { label: 'Submissions', path: '/admin/submissions', icon: FileText },
    { label: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { label: 'Events', path: '/admin/events', icon: Calendar },
    { label: 'Requests', path: '/admin/requests', icon: MessageSquareWarning }
  ];

  const navItems = role === 'student' ? studentNavItems : adminNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(2px)',
            zIndex: 40
          }}
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--color-primary-950)',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease',
          transform: isMobileOpen ? 'translateX(0)' : 'translateX(0)', // responsive handler
          borderRight: '1px solid var(--color-primary-900)'
        }}
        className="sidebar-responsive"
      >
        {/* Brand Header */}
        <div style={{
          padding: 'var(--space-6) var(--space-5)',
          borderBottom: '1px solid var(--color-primary-900)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-md)'
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: 'var(--text-lg)', color: '#ffffff', margin: 0, fontWeight: 'var(--font-weight-bold)', letterSpacing: '-0.02em' }}>
              CampusConnect
            </h2>
            <p style={{ fontSize: '10px', color: 'var(--color-primary-200)', margin: 0, opacity: 0.85 }}>
              One Connected Experience
            </p>
          </div>
        </div>

        {/* Current Role Badge */}
        <div style={{ padding: 'var(--space-3) var(--space-5)', backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-slate-300)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            {role === 'student' ? <User size={14} style={{ color: 'var(--color-primary-400)' }} /> : <ShieldCheck size={14} style={{ color: 'var(--color-accent-500)' }} />}
            <span>{role === 'student' ? 'Student Workspace' : role === 'faculty' ? 'Faculty Portal' : 'Admin Operations'}</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: 'var(--space-4) var(--space-3)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.875rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                  color: isActive ? '#ffffff' : 'var(--color-slate-300)',
                  backgroundColor: isActive ? 'var(--color-primary-800)' : 'transparent',
                  transition: 'var(--transition-fast)',
                  textDecoration: 'none'
                })}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={14} style={{ opacity: 0.4 }} />
              </NavLink>
            );
          })}
        </nav>

        {/* User Card Footer & Logout */}
        <div style={{
          padding: 'var(--space-4) var(--space-4)',
          borderTop: '1px solid var(--color-primary-900)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary-600)' }}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#ffffff', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {user?.name || 'Alex Morgan'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-slate-400)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {user?.email || 'user@campusconnect.edu'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: 'transparent',
              color: 'var(--color-danger-100)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'var(--transition-fast)'
            }}
          >
            <LogOut size={14} />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
