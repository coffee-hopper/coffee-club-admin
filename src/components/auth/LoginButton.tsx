import { useAuth } from '../../hooks/auth/useAuth';

export function LoginButton() {
  const { handleGoogleLogin } = useAuth();

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      Login with Google
    </button>
  );
} 