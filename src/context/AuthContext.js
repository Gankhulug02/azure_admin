// import React from 'react';
import { createContext, useState } from 'react';

export const AuthContext = createContext('Gana');

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('Ganaa');
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
