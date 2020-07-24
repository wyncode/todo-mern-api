import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import dueFilter from '../helpers/DueFilter';
import Logout from './Logout';

const Navigation = () => {
  const { currentUser, tasks, setFilteredTasks, setCurrentFilter } = useContext(
    AuthContext
  );

  const filterCompleted = (query) => {
    dueFilter(query, tasks, setFilteredTasks);
    setCurrentFilter(query);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        WynTodo
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {currentUser && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item
              className="mr-2"
              onClick={() => filterCompleted('Completed')}
            >
              Completed
            </Nav.Item>
            <Nav.Item onClick={() => filterCompleted('Pending')}>
              Pending
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              {currentUser?.avatar ? (
                <Image
                  src={currentUser.avatar}
                  height={50}
                  width={50}
                  roundedCircle
                />
              ) : (
                `Hi, ${currentUser.name}`
              )}
              <Link className="ml-2" to="/profile">
                Profile
              </Link>
              <Logout />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default Navigation;
