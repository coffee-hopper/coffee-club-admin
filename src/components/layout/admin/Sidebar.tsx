import { useAuth } from "../../../hooks/auth/useAuth";

export function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-2"
        />
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-gray-500 text-sm">{user?.email}</p>
      </div>

      <nav className="flex flex-col space-y-2 mt-4">
        <button className="p-2 text-left bg-gray-100 rounded hover:bg-gray-200">
          Dashboard
        </button>
        <button className="p-2 text-left bg-gray-100 rounded hover:bg-gray-200">
          Orders
        </button>
        <button className="p-2 text-left bg-gray-100 rounded hover:bg-gray-200">
          Menu
        </button>
      </nav>
    </aside>
  );
}
