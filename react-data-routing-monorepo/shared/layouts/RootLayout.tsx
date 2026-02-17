import { Outlet } from 'react-router';
import Sidebar, { type SidebarLink } from '../components/Sidebar';
import { useAuth } from '../auth';

/**
 * Full sidebar link registry.
 * `roles` — if omitted, the link is visible to everyone.
 * If provided, only users whose role is in the array will see it.
 */
const allSidebarLinks: SidebarLink[] = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/products', label: 'Products', roles: ['admin', 'editor'] },
  { to: '/users', label: 'Users', roles: ['admin'] },
  { to: '/settings', label: 'Settings', roles: ['admin', 'editor'] },
  { to: '/ui', label: 'UI Library' },
];

export default function RootLayout() {
  const { user, hasRole } = useAuth();

  const visibleLinks = allSidebarLinks.filter(
    (link) => !link.roles || hasRole(link.roles),
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        links={visibleLinks}
        footer={
          user && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                {user.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.role}</p>
              </div>
            </div>
          )
        }
      />

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
