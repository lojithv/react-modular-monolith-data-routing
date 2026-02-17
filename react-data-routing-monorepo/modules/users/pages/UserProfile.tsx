import { useParams, Link } from 'react-router';

export function Component() {
  const { userId } = useParams();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl">
            U{userId}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">User #{userId}</h2>
            <p className="text-sm text-gray-500">user{userId}@example.com</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/users/${userId}/settings`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            User Settings
          </Link>
          <Link to="/users" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Back to List
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><p className="text-gray-500">Role</p><p className="font-medium text-gray-800">Admin</p></div>
        <div><p className="text-gray-500">Status</p><p className="font-medium text-green-600">Active</p></div>
        <div><p className="text-gray-500">Joined</p><p className="font-medium text-gray-800">Jan 15, 2026</p></div>
        <div><p className="text-gray-500">Last Login</p><p className="font-medium text-gray-800">Feb 17, 2026</p></div>
      </div>
    </div>
  );
}
