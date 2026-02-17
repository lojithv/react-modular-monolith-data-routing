import { Outlet } from 'react-router';

interface ModuleLayoutProps {
  title: string;
}

export default function ModuleLayout({ title }: ModuleLayoutProps) {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </header>
      <Outlet />
    </div>
  );
}
