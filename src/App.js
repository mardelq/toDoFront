import React from 'react';
import TaskList from './TaskList';
import CreateTask from './CreateTask';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Todo App</h1>
        <CreateTask />
        <hr />
        <TaskList />
      </div>
  );
};

export default App;