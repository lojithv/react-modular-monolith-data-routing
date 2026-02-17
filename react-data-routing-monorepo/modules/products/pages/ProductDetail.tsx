import { useParams, Link } from 'react-router';

export function Component() {
  const { productId } = useParams();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Product #{productId}</h2>
        <div className="flex gap-2">
          <Link to={`/products/${productId}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
            Edit
          </Link>
          <Link to="/products" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition">
            Back to List
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Product ID</p>
          <p className="font-medium text-gray-800">{productId}</p>
        </div>
        <div>
          <p className="text-gray-500">Status</p>
          <p className="font-medium text-green-600">Active</p>
        </div>
        <div>
          <p className="text-gray-500">Category</p>
          <p className="font-medium text-gray-800">Electronics</p>
        </div>
        <div>
          <p className="text-gray-500">Price</p>
          <p className="font-medium text-gray-800">$79.99</p>
        </div>
      </div>
    </div>
  );
}
