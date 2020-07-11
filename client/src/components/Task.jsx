import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CompleteButton from './CompleteButton';
import DeleteButton from './DeleteButton';

const Task = () => {
  const { tasks, setTasks } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('/tasks?sortBy=dueDate:asc', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTasks(await response.data);
      } catch (error) {
        console.log(`Tasks Request Error: `, error);
      }
    };
    getTasks();
  }, [setTasks, token, tasks]);

  return (
    <>
      {tasks.map((task) => (
        <tr key={task._id}>
          <td>
            {task.completed ? (
              <strike>{task.description}</strike>
            ) : (
              task.description
            )}
          </td>
          <td>{task.dueDate}</td>
          <td>
            <CompleteButton task={task} />
            <DeleteButton id={task._id} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default Task;
