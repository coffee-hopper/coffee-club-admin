import { User } from '../types/user';

const USER_KEY = 'user';

export const storage = {
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  
  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  }
}; 