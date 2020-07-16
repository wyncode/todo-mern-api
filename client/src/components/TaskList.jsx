import React, { useEffect, useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Task from './Task';
import Search from './Search';
import { AuthContext } from '../context/AuthContext';

const TaskList = () => {
  const {
    setTasks,
    search,
    filteredTasks,
    setFilteredTasks,
    loading
  } = useContext(AuthContext);

  // initital render will set all the todos to the `tasks` state
  useEffect(() => {
    axios
      .get('/api/tasks?sortBy=dueDate:asc', {
        withCredentials: true
      })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => {
        console.log(`Tasks Request Error: `, error);
      });
    // when setTasks, setFilteredTasks, and search values are changed, it will rerender.
  }, [setTasks, setFilteredTasks, search, loading]);

  return (
    <Container>
      <Search />
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Due</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Task tasks={filteredTasks} />
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
