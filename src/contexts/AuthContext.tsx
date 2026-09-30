import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { initialEmployees, type Employee } from '@/lib/mock-data';

interface AuthState {
  isAuthenticated: boolean;
  user: Employee | null;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => void;
  switchUser: (employeeId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true, // Start in loading state to protect refresh redirects
  });

  useEffect(() => {
    // Simulate auth initialization to prevent premature redirects on refresh
    try {
      const savedUser = localStorage.getItem('demo_user_id');
      const user = savedUser ? initialEmployees.find(e => e.id === savedUser) : null;
      
      setAuthState({
        isAuthenticated: !!user, // Only authenticated if we actually found a valid user
        user: user || null,
        isLoading: false,
      });
    } catch (e) {
      console.error("Auth init error:", e);
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  }, []);

  const login = () => {
    const defaultUser = initialEmployees.find(e => e.role === 'Admin / Owner') || initialEmployees[0];
    localStorage.setItem('demo_user_id', defaultUser.id);
    setAuthState({
      isAuthenticated: true,
      user: defaultUser,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('demo_user_id');
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  const switchUser = (employeeId: string) => {
    const newUser = initialEmployees.find(e => e.id === employeeId);
    if (newUser) {
      localStorage.setItem('demo_user_id', newUser.id);
      setAuthState({
        isAuthenticated: true,
        user: newUser,
        isLoading: false,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
