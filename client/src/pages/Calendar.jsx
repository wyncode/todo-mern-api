import React, { useState, useEffect } from 'react';
import './calendar.css';
import RCalendar from 'react-calendar';
import moment from 'moment';

function Calendar() {
  const [value, onChange] = useState(new Date()),
    [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  tasks.map((task) => {
    if (task?.dueDate) console.log(task.dueDate);
  });
  return (
    <div>
      <RCalendar
        onChange={onChange}
        value={new Date()}
        style={{ width: '100vw' }}
        calendarType="US"
        // onClickDay={(e) => console.log(e)}
        tileContent={({ date, view }) => {
          console.log(date.toString());
          // console.log(task.dueDate);
          return view === 'month' &&
            moment(date) === tasks.map((task) => task?.dueDate) ? (
            <p>Sunday</p>
          ) : null;
        }}
      />
    </div>
  );
}

export default Calendar;
