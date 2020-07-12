import React, { useEffect, useContext, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import Task from './Task';
import Search from './Search';
import { AuthContext } from '../context/AuthContext';

const TaskList = () => {
  const token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const {
    tasks,
    setTasks,
    setFilteredTasks,
    filteredTasks,
    currentFilter
  } = useContext(AuthContext);

  // initital render will set all the todos to the `tasks` state
  useEffect(() => {
    axios
      .get('/tasks?sortBy=dueDate:asc', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(`Tasks Request Error: `, error);
      });
  }, [token, setTasks, tasks]);

  // whenever a filter is applied, it updates the tasks to render
  useEffect(() => {
    if (search.length > 1) {
      setFilteredTasks(
        tasks.filter((task) => {
          return task.description.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else if (currentFilter.length < 1) {
      setFilteredTasks(tasks);
    }
  }, [search, setFilteredTasks, tasks, currentFilter.length, filteredTasks]);

  return (
    <Container>
      <Search setSearch={setSearch} />
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
