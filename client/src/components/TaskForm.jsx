import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

const TaskForm = () => {
  const [taskData, setTaskData] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
    console.log('taskData', taskData);
  };

  const handleTaskSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'POST',
        url: '/tasks',
        headers: { Authorization: `Bearer ${token}` },
        data: taskData
      });
      swal('New Task!', 'You task has been added!', 'success');
      setTaskData({});
      console.log(response);
    } catch (error) {
      console.log('Add Task Error: ', error);
    }
  };
  return (
    <Container>
      <Form onSubmit={handleTaskSubmission}>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a task"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter a task"
            name="dueDate"
            onChange={handleChange}
            className="col-md-4"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Button type="submit">Add Task</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default TaskForm;
