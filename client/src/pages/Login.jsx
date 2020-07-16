import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = ({ history }) => {
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      setCurrentUser(await response.data.user);
      history.push('/');
    } catch (error) {
      console.log('Login Error: ', error);
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">WynTodo!</h1>
      <Form style={{ width: 300 }} onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
      <Link className="mt-4" to="/signup">
        Need an Account? Sign up.
      </Link>
    </Container>
  );
};

export default Login;
