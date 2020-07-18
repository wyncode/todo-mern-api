import React, { useState, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { AuthContext } from '../context/AuthContext';

const TaskForm = () => {
  const [taskData, setTaskData] = useState('');
  const { setLoading } = useContext(AuthContext);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleTaskSubmission = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios({
        method: 'POST',
        url: '/api/tasks',
        withCredentials: true,
        data: taskData
      });
      swal('New Task!', 'You task has been added!', 'success');
      setTaskData({});
      setLoading(false);
    } catch (error) {
      swal('Oops!', error);
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
