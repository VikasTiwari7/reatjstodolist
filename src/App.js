import React, { useState, useRef, useEffect } from "react";
import Form from "./comp/Form";
import FilterButton from "./comp/FilterButton";
import Todo from "./comp/Todo";
import { nanoid } from "nanoid";
import "./App.css";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
     
      if (id === task.id) {
      
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = 
    { 
      id: "todo-" + nanoid(),
      name: name,
      completed: false
   };
    setTasks([...tasks, newTask]);
  }

  return (
    <div>
      <Form addTask={addTask} />
      <div>{filterList}</div>
      <h2>{tasks.length} task Remaining</h2>
      <ul>{taskList}</ul>
    </div>
  );
}

export default App;
