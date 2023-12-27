import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Body=()=>{
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
      });
      const [taskInput, setTaskInput] = useState('');
    
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() === '') {
        toast.error('Please enter a task description');
        return; 
      }
    
      const newTask = {
        id: Date.now(),
        description: taskInput,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      toast.success('Item added to the list');
  };
  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    toast.info('Completed tasks cleared');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    toast.success('Item Deleted'); 
  };
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  const completedTasksExist = tasks.some((task) => task.completed);

    return(
        <div className='mainContainer'>
        <div className='taskdiv'>
            <h2>ToDo List App</h2>
            <div className='flexContainer'>
                <input
                 className='taskinput'
                 type='text'
                 value={taskInput}
                 onChange={handleInputChange}
                 placeholder='Enter task description...'
                ></input>
                <button className='buttonAdd' onClick={addTask}>Add Task</button>
            </div>
            <div className='ullist'>
            <ul>
  {tasks.map((task) => (
    <li key={task.id}>
      <input
        type="checkbox"
        onChange={() => toggleTaskCompletion(task.id)}
       />
       <span className='result'>

       <span
           className={task.completed ? 'completedTask' : 'task'}
            style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                 }}
            >
             {task.description}
            </span>
      <button className='delButton' onClick={() => deleteTask(task.id)}>
        Delete
      </button>
      </span>
    </li>
    
  ))}
</ul>
{completedTasksExist && (
        <div className='center'>
          <button className='clearCompletedButton' onClick={clearCompletedTasks}>
            Clear Completed
          </button>
        </div>
      )}
<ToastContainer position="top-center" />
        </div>
        </div>
        </div>
    )
}

export default Body;