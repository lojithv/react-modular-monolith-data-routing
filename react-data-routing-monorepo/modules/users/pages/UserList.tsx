import { Link } from 'react-router';

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
  { id: '4', name: 'Diana Lee', email: 'diana@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Ethan Brown', email: 'ethan@example.com', role: 'Admin', status: 'Active' },
];

export function Component() {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">All Users</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{user.role}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {user.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
