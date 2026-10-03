import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb({ customCrumbs }) {
  const location = useLocation();

  let crumbs = [];
  if (customCrumbs) {
    crumbs = customCrumbs;
  } else {
    const pathnames = location.pathname.split('/').filter((x) => x);
    let currentPath = '';
    crumbs = pathnames.map((name, index) => {
      currentPath += `/${name}`;
      // Format breadcrumb text nicely
      let label = name.charAt(0).toUpperCase() + name.slice(1);
      if (name === 'student') label = 'Student Portal';
      if (name === 'admin') label = 'Admin & Faculty Portal';
      if (name.startsWith('asg-') || name.startsWith('REQ-')) label = name;

      return {
        label,
        path: currentPath,
        isLast: index === pathnames.length - 1
      };
    });
  }

  if (crumbs.length === 0) return null;

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', marginBottom: 'var(--space-2)' }}>
      <Link to="/" style={{ color: 'var(--color-slate-500)', display: 'flex', alignItems: 'center' }}>
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={crumb.path || idx}>
          <ChevronRight size={12} style={{ color: 'var(--color-slate-400)' }} />
          {crumb.isLast ? (
            <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-primary-900)' }}>
              {crumb.label}
            </span>
          ) : (
            <Link to={crumb.path} style={{ color: 'var(--color-slate-600)' }}>
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHeader({ title, subtitle, breadcrumb = true, actions }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)' }}>
      {breadcrumb && <Breadcrumb />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-primary-950)', margin: 0, fontWeight: 'var(--font-weight-bold)' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-500)', margin: '4px 0 0 0' }}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>{actions}</div>}
      </div>
    </div>
  );
}

export default PageHeader;
