import React, {useState} from 'react';
import './Navbar.css';


function Navbar({title}){
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () =>{
        if(task === "") return;
        setTasks([...tasks, task]);
        setTask("");
    };

    const deleteTask = (index) =>{
        const newTasks = tasks.filter((_,i) => i !== index);
        setTasks(newTasks);
    };

    return(
        <div>
            <h3>{title}</h3>

            {title = "Tasks" && (
                
                <>
                <input value={task} onChange={(e) => setTask(e.target.value)} placeholder = "Enter Task"></input>

                <button onClick ={addTask}>Add Task</button>

                <ul>
                    {tasks.map((t,i) => (
                        <li key={i}>
                            {t}
                            <button onClick={() => deleteTask(i)}>X</button>
                        </li>
                    ))}
                </ul>

                </>
            )}
        </div>
    );
}


export default Navbar;


