import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { LoginButton } from './LoginButton';
import { UserProfile } from './UserProfile';
import { useAuth } from '../../hooks/auth/useAuth';
import { storage } from '../../utils/storage';

export function AuthContainer() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    const errorParam = params.get('error');

    if (userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        storage.setUser(user);
        queryClient.setQueryData(['user'], user); // for the cache
      } catch (error) {
        console.error('Failed to parse user data:', error);
      } finally {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    if (errorParam) {
      console.error('Auth error:', decodeURIComponent(errorParam));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [queryClient]);

  return user ? <UserProfile /> : <LoginButton />;
} 