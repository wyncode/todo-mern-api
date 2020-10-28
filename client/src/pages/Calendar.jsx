import React, { useState, useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthContext } from '../context/AuthContext';
import AddTaskModal from '../components/AddTaskModal';
import Navigation from '../components/Navigation';

const Calendar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [taskDate, setTaskDate] = useState(null);
  const [events, setEvents] = useState([]);
  const { tasks, loading, setLoading } = useContext(AuthContext);

  useEffect(() => {
    const updateTasks = tasks.map((task) => {
      const title = task.description;
      const date = task.dueDate;
      return { title, date };
    });
    setEvents(updateTasks);
    console.log('hit');
  }, [loading, tasks, setLoading, taskDate, modalShow]);

  console.log(tasks);

  const handleDateClick = (e) => {
    setTaskDate(e.dateStr);
    setModalShow(true);
  };
  return (
    <>
      <Navigation />
      <Container className="mt-2">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
        <AddTaskModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          date={taskDate}
        />
      </Container>
    </>
  );
};

export default Calendar;
