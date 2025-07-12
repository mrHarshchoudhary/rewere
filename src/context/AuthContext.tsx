import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  points: number;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app start
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, verify token with backend
      // For demo, we'll use mock user data
      const mockUser: User = {
        id: '1',
        email: 'demo@rewear.com',
        name: 'Demo User',
        points: 120,
        role: 'user'
      };
      setUser(mockUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@rewear.com' && password === 'admin123') {
        const adminUser: User = {
          id: '2',
          email: 'admin@rewear.com',
          name: 'Admin User',
          points: 0,
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('authToken', 'mock-admin-token');
        setLoading(false);
        return true;
      } else if (password === 'demo123') {
        const mockUser: User = {
          id: '1',
          email: email,
          name: 'Demo User',
          points: 120,
          role: 'user'
        };
        setUser(mockUser);
        localStorage.setItem('authToken', 'mock-user-token');
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: name,
        points: 50, // Welcome bonus
        role: 'user'
      };
      
      setUser(newUser);
      localStorage.setItem('authToken', 'mock-new-user-token');
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};