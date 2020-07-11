import React from 'react';
import { Container, Table } from 'react-bootstrap';
import Task from './Task';

const TaskList = () => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Due</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Task />
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskList;
