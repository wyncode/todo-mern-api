import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [currentFilter, setCurrentFilter] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);
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
        tasks,
        setTasks,
        search,
        setSearch,
        currentFilter,
        setCurrentFilter,
        setFilteredTasks,
        filteredTasks,
        loading,
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
