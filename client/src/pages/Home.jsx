import React, { useContext } from 'react';
import Navigation from '../components/Navigation';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import DateFilters from '../components/DateFilters';
import { AuthContext } from '../context/AuthContext';
import Calendar from '../components/Calendar';

const Home = () => {
  const { calendarView } = useContext(AuthContext);
  return (
    <div>
      <Navigation />
      {calendarView ? (
        <Calendar />
      ) : (
        <>
          <DateFilters />
          <TaskList />
          <TaskForm />
        </>
      )}
    </div>
  );
};

export default Home;
