import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

function Tasks(){
    const [completeTask, setCompleteTask] = useState([]);
    const [todoTask, setTodoTask] = useState([]);
    const [task, setTask] = useState([]);
    const [innput, setInput] = useState("");
    const { db, e, useReturn} = useEasybase();
    //const { task } = useReturn(() => db("TASKS").return().limit(10).all(), []);

    const mounted = async() => {
      const ebData = await db("TASKS").return().limit(10).all();
      const completeData = await db("TASKS").return().where(e.eq("complete",true)).all();
      const todoData = await db("TASKS").return().where(e.eq("complete",false)).all();
      setTask(ebData);
      setCompleteTask(completeData);
      setTodoTask(todoData);
    }

    const removeTask = async(key) => {
      const del = await db('TASKS', true).delete().where({ _key : key }).one();
      mounted();
   }

   const addTask = async() => {
    const AddedElement = {"_key":"new", "content":null, "complete":false, "editDate":Date()}
    setTodoTask(todoTask => ([...todoTask, AddedElement]));
  }

    const saveTask = async(key, content) => {
      console.log(key +" "+ content);
      if(key == "new")
        await db('TASKS').insert({content: content,complete: false,}).one();
      else
        await db('TASKS').where({_key:key}).set({content: content,complete: false,}).one();
    }

    const checkTask = async(key) => {
      await db('TASKS').where({_key:key}).set({complete: true}).one();
      mounted();
    }

    useEffect(() => {
        mounted();
      }, []);

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
                <input className="task-input" onFocus={(e) => {console.log('Focused on input');}} 
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