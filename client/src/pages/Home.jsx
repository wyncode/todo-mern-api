import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <TaskList />
      <TaskForm />
    </div>
  );
};

export default Home;
