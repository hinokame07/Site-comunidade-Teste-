import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      const adminUser = { username: 'admin', role: 'admin' as const };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.username === username && u.password === password);
    
    if (foundUser) {
      const userObj = { username, role: 'user' as const };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
      return true;
    }
    return false;
  };

  const register = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.username === username)) {
      return false;
    }
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}