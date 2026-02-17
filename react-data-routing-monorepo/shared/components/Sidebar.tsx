import { NavLink } from 'react-router';
import type { UserRole } from '@shared/auth/index.ts';

export interface SidebarLink {
  to: string;
  label: string;
  roles?: UserRole[];
}

interface SidebarProps {
  title?: string;
  subtitle?: string;
  links: SidebarLink[];
  footer?: React.ReactNode;
}

export default function Sidebar({
  title = 'Monorepo App',
  subtitle = 'Modular Architecture',
  links,
  footer,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">{title}</h1>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {footer !== undefined ? (
        <div className="px-6 py-4 border-t border-gray-200">{footer}</div>
      ) : (
        <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-400">
          v0.0.1 &mdash; React Router v7
        </div>
      )}
    </aside>
  );
}
