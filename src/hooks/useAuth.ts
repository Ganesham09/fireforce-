import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem('fireSystemAuth');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Simple mock authentication
    if (username === 'admin' && password === 'firesafe123') {
      localStorage.setItem('fireSystemAuth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('fireSystemAuth');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};