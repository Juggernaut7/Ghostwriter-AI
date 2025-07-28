import React, { createContext, useState, useEffect } from 'react';
import { loginUser, signupUser, getUser } from '../utils/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const result = loginUser(email, password);
    if (result.success) {
      setUser({ email });
      setIsAuthenticated(true);
    }
    return result;
  };

  const signup = (email, password) => {
    const result = signupUser(email, password);
    if (result.success) {
      setUser({ email });
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;