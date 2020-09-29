import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthContext } from '../context/AuthContext';

const Calendar = () => {
  const { tasks } = useContext(AuthContext);

  const events = tasks.map((task) => {
    const title = task.description;
    const date = task.dueDate;
    return { title, date };
  });
  console.log(events);
  return (
    <Container className="mt-2">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </Container>
  );
};

export default Calendar;
