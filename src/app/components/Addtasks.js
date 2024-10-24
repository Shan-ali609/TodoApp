"use client";
import React, { useEffect, useState } from "react";

function Addtasks() {
  const [task, setTask] = useState("");
  const [taskslist, setTaskslist] = useState([]);

  const fetchtasks = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setTaskslist(data);
      } else {
        console.log("Error fetching tasks");
      }
    } catch (error) {
      console.log("Network error");
    }
  };

  useEffect(() => {
    fetchtasks();
  }, []);

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) {
      alert("Please enter a task");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ task }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setTaskslist([...taskslist, result]);
        setTask("");
      } else {
        console.log("Error adding task");
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setTaskslist(taskslist.filter((task) => task._id !== id));
      } else {
        console.log("Error deleting task");
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Add a Task</h1>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a new task"
          required
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Add Task
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Tasks List</h2>
      {taskslist.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        <ul className="pl-3 text-black ">
          {taskslist.map((task) => (
            <li
              key={task._id}
              className="mb-2 bg-black/10 p-3 flex justify-between items-center"
            >
              {task.task}
              <button
                onClick={() => handleDelete(task._id)}
                className="ml-4 p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Addtasks;
