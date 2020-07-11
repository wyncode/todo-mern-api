import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const CompleteButton = ({ task }) => {
  const token = localStorage.getItem('token');

  const toggleComplete = async () => {
    try {
      const response = await axios({
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        url: `/tasks/${task._id}`,
        data: { completed: !task.completed }
      });
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
