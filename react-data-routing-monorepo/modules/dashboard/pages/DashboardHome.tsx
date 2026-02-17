import { Link, useLoaderData } from 'react-router';

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

/** Route loader — replace with real API call in production */
export async function loader() {
  const stats: DashboardStat[] = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', positive: true },
    { label: 'Active Users', value: '2,350', change: '+15.3%', positive: true },
    { label: 'Products', value: '128', change: '+4.5%', positive: true },
    { label: 'Pending Orders', value: '23', change: '-2.1%', positive: false },
  ];
  return { stats };
}

export function Component() {
  const { stats } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            <p className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex gap-3">
          <Link to="/products/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            Add Product
          </Link>
          <Link to="/users" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            View Users
          </Link>
          <Link to="/dashboard/reports" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
