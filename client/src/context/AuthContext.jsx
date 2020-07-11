import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    // incase user refreshes local session is cleared.
    if (token && !currentUser) {
      axios
        .get(`/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(({ data }) => {
          setCurrentUser(data);
        });
    }
  }, [token, currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        tasks,
        setTasks
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
