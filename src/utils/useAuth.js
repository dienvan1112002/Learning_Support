// useAuth.js
import { useState } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Todo check logic later
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Todo check logic later
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}