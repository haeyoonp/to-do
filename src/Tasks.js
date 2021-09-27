import { useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";
import CompleteList from './CompleteList.js';
import TodoList from './TodoList.js';

const Tasks = ({input}) => {
    const [completeTask, setCompleteTask] = useState([]);
    const [todoTask, setTodoTask] = useState([]);
    const [task, setTask] = useState([]);
    const { db} = useEasybase();

    const mounted = async() => {
      const taskData = await db("TASKS").return().all();
      const completeData = taskData.filter(function(task){ return task && task.complete===true });
      const todoData = taskData.filter(function(task){ return task && task.complete===false });
      todoData.sort(function(a, b) {
        return parseInt(a.id) - parseInt(b.id);
      });
      setCompleteTask(completeData);
      setTodoTask(todoData);
      setTask(taskData);
    }

    const removeTask = async(key, complete) => {
      const allData = task.filter(item => item && item && item._key !== key);
      setTask((task) => (allData));
      if(complete){
        const completeData = allData.filter(function(task){ return task && task.complete===true });
        setCompleteTask((completeTask) => (completeData));
      }else{
        const todoData = allData.filter(function(task){ return task && task.complete===false });
        setTodoTask((todoTask) => (todoData));
      }
      await db('TASKS', true).delete().where({ _key : key }).one();
    }

   const addTask = async() => {
      await db('TASKS').insert({content: "",complete: false}).one();
      mounted();
    }

    const saveTask = async(key, content) => {
      await db('TASKS').where({_key:key}).set({content: content,complete: false}).one();
    }

    const updateIndexTask = async(items) => {
      items.map( async ({ _key, id}, index) => {
        await db('TASKS').where({_key:_key}).set({id: index}).one();
      });
     }

    const searchTask = async (input) => {
      if(!input || input === ""){  
        mounted();
      }else{
        const completeSearched = task.filter(item => item && item.complete === true && item.content && item.content.toLowerCase().includes(input.toLowerCase()));
        const todoSearched = task.filter(item => item && item.complete === false && item.content && item.content.toLowerCase().includes(input.toLowerCase()));
        todoSearched.sort(function(a, b) {
          return parseInt(a.id) - parseInt(b.id);
        });
        setCompleteTask((completeTask) => (completeSearched));
        setTodoTask((todoTask) => (todoSearched));
      }
    }

    const checkTask = async(key) => {
      const checkTask = await db('TASKS').return().where({_key:key}).one();
      checkTask.complete = true;
      const newTask = task.map(t => {
        if (t._key === key)
          t = checkTask;
        return t;
      }) 
      const newTodoTask = todoTask.filter(item => item && item._key !== key);
      setCompleteTask([...completeTask, checkTask]);
      setTodoTask((todoTask) => (newTodoTask));
      setTask((task) => (newTask));
      await db('TASKS').where({_key:key}).set({complete: true, id : -1}).one();
    }

    useEffect(() => {
        searchTask(input);  
      }, [input])

    const renderTaskList = (complete) => {
      var data;
      if(complete){
        data = completeTask//task.filter(function(task){ return task && task.complete===true });
        return <CompleteList data={data} removeTask={removeTask}/>
      }else{
        data = todoTask//task.filter(function(task){ return task && task.complete===false });
        return <TodoList data={data} taskAction={[checkTask, removeTask, saveTask, updateIndexTask, setTodoTask]} />
      }
    }

    return (

        <div className="task-body">
          <div className="task-list">
            <h2>Completed</h2>
            <div>{renderTaskList(true)}</div>
          </div>
          <div className="task-list">
            <h2>To-Do List</h2>
            <div>{renderTaskList(false)}</div>
            <button className="add-btn" onClick={() => addTask()}>ADD</button>
          </div>
        </div>
  );
}

export default Tasks;