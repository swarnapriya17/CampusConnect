import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--color-bg-page)' }}>
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '260px', // Matches sidebar width on desktop
        minWidth: 0
      }} className="main-content-responsive">
        <Header onToggleMobile={() => setIsMobileOpen(!isMobileOpen)} />

        <main style={{
          flex: 1,
          padding: 'var(--space-8) var(--space-8)',
          maxWidth: '1320px',
          width: '100%',
          margin: '0 auto'
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
