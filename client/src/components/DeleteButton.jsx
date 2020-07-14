import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { AuthContext } from '../context/AuthContext';

const DeleteButton = ({ id }) => {
  const { setLoading } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    setLoading(true);
    try {
      const willDelete = await swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      });
      if (willDelete) {
        try {
          const response = await axios({
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
            url: `/tasks/${id}`
          });
          swal('Poof! Your task has been deleted!', {
            icon: 'success'
          });
          console.log(response);
          setLoading(false);
        } catch (error) {}
      } else {
        swal('Your task is safe!');
      }
    } catch (error) {
      console.log('Delete Error', error);
    }
  };
  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DeleteButton;
