import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, FormControl, Button } from 'react-bootstrap';

const ResetPassword = () => {
  return (
    <Container className="container d-flex flex-column align-items-center justify-content-center fullscreen">
      <h1 className="mb-4">Reset Password</h1>
      <Form style={{ width: 300 }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            // onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            name="password"
            // onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Reset Password
          </Button>
        </Form.Group>
      </Form>
      <Link to="/login">Go back</Link>
    </Container>
  );
};

export default ResetPassword;
