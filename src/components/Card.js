import React, { useState, useRef, useEffect } from "react";
import "./Card.css";

function Card({ title }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef(null);

  const streakKey = "streak";
  const lastVisitKey = "lastVisitDate";

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem(streakKey)) || 0;
  });

  // Timer effect
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

  // Streak logic — runs only once on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(lastVisitKey);
    const savedStreak = Number(localStorage.getItem(streakKey)) || 0;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    let newStreak;

    if (!lastVisit) {
      // First time ever visiting
      newStreak = 1;
    } else if (lastVisit === today) {
      // Already visited today, don't change streak
      newStreak = savedStreak;
    } else if (lastVisit === yesterdayString) {
      // Visited yesterday — continue streak
      newStreak = savedStreak + 1;
    } else {
      // Missed a day — reset streak
      newStreak = 1;
    }

    setStreak(newStreak);
    localStorage.setItem(streakKey, String(newStreak));
    localStorage.setItem(lastVisitKey, today);
  }, []);

  const startTimer = () => {
    if (time > 0) setIsRunning(true);
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
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="card">
      <h3>{title}</h3>

      {title === "Tasks" && (
        <div>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter Task"
          />
          <button onClick={addTask}>Add Task</button>
          <ul className="card__list">
            {tasks.map((t, i) => (
              <li key={i} className="card__task-item">
                <span>{t}</span>
                <button className="card__delete" onClick={() => deleteTask(i)}>
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {title === "Focus-Time" && (
        <div>
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
            <button className="card__btn card__btn--reset" onClick={resetTimer}>
              Reset
            </button>
          </div>
        </div>
      )}

      {title === "Streak" && (
        <div>
          <h2>{streak} Days</h2>
        </div>
      )}
    </div>
  );
}

export default Card;
