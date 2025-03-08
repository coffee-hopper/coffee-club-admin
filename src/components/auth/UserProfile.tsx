import { useAuth } from '../../hooks/auth/useAuth';

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome, {user.email}!</h2>
      <pre className="text-left bg-gray-100 p-4 rounded-md">
        {JSON.stringify(user, null, 2)}
      </pre>
      <button
        onClick={() => logout()}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
} 