'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sesión con el backend
    const verifySession = async () => {
      try {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (!savedToken || !savedUser) {
          setIsLoading(false);
          return;
        }

        // Verificar que el token sea válido con el backend
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const res = await fetch(`${API_URL}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${savedToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.user) {
            const user: User = {
              id: data.data.user.id,
              username: data.data.user.nombre || data.data.user.username,
              email: data.data.user.email,
              role: data.data.user.rol === 'admin' ? 'ADMIN' : 'CUSTOMER',
            };
            setUser(user);
          } else {
            // Token inválido, limpiar localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } else {
          // Token inválido, limpiar localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
        // En caso de error, usar datos guardados localmente si existen
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // El backend retorna: { success, message, data: { user, token } }
        if (data.success && data.data?.user && data.data?.token) {
          const user: User = {
            id: data.data.user.id,
            username: data.data.user.nombre || data.data.user.username,
            email: data.data.user.email,
            role: data.data.user.rol === 'admin' ? 'ADMIN' : 'CUSTOMER',
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', data.data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: username, email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // El backend retorna: { success, message, data: { user, token } }
        if (data.success && data.data?.user && data.data?.token) {
          const user: User = {
            id: data.data.user.id,
            username: data.data.user.nombre || data.data.user.username,
            email: data.data.user.email,
            role: data.data.user.rol === 'admin' ? 'ADMIN' : 'CUSTOMER',
          };
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', data.data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error al registrarse:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Mostrar loader mientras verifica la sesión
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-900 mb-4"></div>
          <p className="text-gray-600 font-medium">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
