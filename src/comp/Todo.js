import React, { useEffect, useRef, useState } from "react";



export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newName.trim()) {
      return;
    }
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          id={props.id}
          value={newName || props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div>
        <button onClick={() => setEditing(false)}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div >
      <div >
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label  htmlFor={props.id}>
          {props.name}
        </label>
      </div>
      <div >
        <button
          type="button"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          Edit 
        </button>
        <button
          type="button"
          onClick={() => props.deleteTask(props.id)}
        >
          Delete 
        </button>
      </div>
    </div>
  );



  return <li >{isEditing ? editingTemplate : viewTemplate}</li>;
}
