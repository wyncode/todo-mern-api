import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteButton = ({ id }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      const response = await axios({
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
        url: `/tasks/${id}`
      });
      console.log(response);
    } catch (error) {
      console.log('Delete Error', error);
    }
  };
  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DeleteButton;
