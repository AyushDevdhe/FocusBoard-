import React, { useState, useRef, useEffect } from "react";
import "./Card.css";

function Card({ title }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      timeoutRef.current = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsRunning(false);
      alert("Time Over");
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isRunning, time]);

  const startTimer = () => {
    if (time > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearTimeout(timeoutRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearTimeout(timeoutRef.current);
    setTime(1500);
  };

  const addTask = () => {
    if (task === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        {title === "Tasks" && (
          <>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter Task"
            ></input>

            <button onClick={addTask}>Add Task</button>

            <ul className="card__list">
              {tasks.map((t, i) => (
                <li key={i} className="card__task-item">
                  <span>{t}</span>
                  <button
                    className="card__delete"
                    onClick={() => deleteTask(i)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div>
        {title === "Focus-Time" && (
          <>
            <div className="card__timer">
              <span className="card__time">
                {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </span>
            </div>

            <div className="card__buttons">
              <button className="card__btn" onClick={startTimer}>
                Start
              </button>
              <button className="card__btn" onClick={pauseTimer}>
                Pause
              </button>
              <button
                className="card__btn card__btn--reset"
                onClick={resetTimer}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
