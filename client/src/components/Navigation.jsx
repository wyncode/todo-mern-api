import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import Logout from './Logout';

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        WynTodo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {currentUser && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Completed</Nav.Link>
            <Nav.Link href="#link">Pending</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item>
              {`Hi, ${currentUser.name}`}
              <Logout />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
