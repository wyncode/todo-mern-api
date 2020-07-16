import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CompleteButton = ({ task }) => {
  const { setLoading } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const toggleComplete = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'PATCH',
        url: `/api/tasks/${task._id}`,
        withCredentials: true,
        data: { completed: !task.completed }
      });
      swal('Updated', 'Your task has been updated!', 'success');
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(`Update Error: `, error);
    }
  };
  return (
    <Button className="mr-2" onClick={toggleComplete}>
      {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
    </Button>
  );
};

export default CompleteButton;
