import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import swal from 'sweetalert';
import axios from 'axios';

const Logout = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const handleSignOut = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/users/logout',
        withCredentials: true
      });
      localStorage.removeItem('token');
      setCurrentUser(null);
      swal(response.data.message, 'You have signed out!', 'success');
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
