import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const handleSignOut = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/users/logout',
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      setCurrentUser(null);
      alert(response.data.message);
    } catch (error) {
      console.log('Logout Error: ', error);
    }
  };

  return (
    <Button className="ml-3" onClick={handleSignOut}>
      Logout
    </Button>
  );
};

export default Logout;
