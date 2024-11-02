// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userID, setUserID] = useState(null); // Estado para almacenar el UserID
  
  const signIn = (id) => {
    setIsSignedIn(true);
    setUserID(id); // Establece el UserID al iniciar sesión
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUserID(null); // Resetea el UserID al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, userID, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
