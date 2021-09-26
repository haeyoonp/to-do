import { useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

const Tasks = ({input}) => {
    const [completeTask, setCompleteTask] = useState([]);
    const [todoTask, setTodoTask] = useState([]);
    const { db, e} = useEasybase();

    const mounted = async() => {
      const completeData = await db("TASKS").return().where(e.eq("complete",true)).all();
      const todoData = await db("TASKS").return().where(e.eq("complete",false)).all();
      setCompleteTask(completeData);
      setTodoTask(todoData);
    }
   
    const removeTask = async(key) => {
      await db('TASKS', true).delete().where({ _key : key }).one();
      mounted();
   }

   const addTask = async() => {
    const AddedElement = {"_key":"new", "content":null, "complete":false, "editDate":Date()}
    setTodoTask(todoTask => ([...todoTask, AddedElement]));
  }

    const saveTask = async(key, content) => {
      if(key === "new")
        await db('TASKS').insert({content: content,complete: false}).one();
      else
        await db('TASKS').where({_key:key}).set({content: content,complete: false}).one();
    }

    const searchTask = async (input) => {
      if(!input || input === ""){  
        mounted();
      }else{
        const completeSearched = completeTask.filter(item => item && item.content && item.content.toLowerCase().includes(input));
        const todoSearched = todoTask.filter(item => item && item.content && item.content.toLowerCase().includes(input));
        setCompleteTask((completeTask) => (completeSearched));
        setTodoTask((todoTask) => (todoSearched));
      }
  }

    const checkTask = async(key) => {
      await db('TASKS').where({_key:key}).set({complete: true}).one();
      mounted();
    }

    useEffect(() => {
        mounted(); 
      }, [])

    useEffect(() => {
        searchTask(input);  
      }, [input])

    const renderTaskList = (complete) => {
      var data;
      if(complete)
        data = completeTask;
      else
        data = todoTask;
      return data && data.map(({ _key, content}) => {
          return (
            <div className="single-task">
                <button className="check-btn" onClick={() => checkTask(_key)}></button>
                <input key={_key} className="task-input" onFocus={(e) => {console.log('Focused on input');}} 
                onBlur={(e) => {saveTask(_key, e.target.value)}}
                defaultValue={content}></input>
                <button className="delete-btn" onClick={() => removeTask(_key)}></button>
            </div>
          );
      });
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
            <button className="add-btn" onClick={() => addTask()}></button>
          </div>
        </div>
  );
}

export default Tasks;