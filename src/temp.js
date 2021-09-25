import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";
import AddTaskButton from './AddTaskButton.js';

function Tasks(){
    const [completeTask, setCompleteTask] = useState([]);
    const [todoTask, setTodoTask] = useState([]);
    const [task, setTaskData] = useState([]);
    const { db, e, useReturn} = useEasybase();
    //const { task } = useReturn(() => db("TASKS").return().limit(10).all(), []);

    const mounted = async() => {
      const ebData = await db("TASKS").return().limit(10).all();
      const completeData = ebData.where(e.eq("complete",true)).all();
      const todoData = ebData.where(e.eq("complete",false)).all();
      setTaskData(completeData);
      setCompleteTask(completeData);
      setTodoTask(todoData);
    };

    const removeData = async(key) => {
      const del = await db('TASKS', true).delete().where({ _key : key }).one();
      mounted();
   }

    useEffect(() => {
        mounted();
      }, []);
    
    const renderCompleteHeader = () => {
        let headerElement = ['No.', 'Title', 'Content', 'status', 'complete date'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    const renderCompleteBody = () => {
      return completeTask && completeTask.map(({ _key, title, content, complete, lastedit },index) => {
          return (
              <tr key={_key}>
                  <td>{index+1}</td>
                  <td>{title}</td>
                  <td>{content}</td>
                  <td>Complete</td>
                  <td>{lastedit.substring(0,10)}</td>
                  <td className='opration'>
                      <button onClick={() => removeData(_key)}>delete</button>
                  </td>
              </tr>
          );
      });
    }

    const renderTodoHeader = () => {
      let headerElement = ['No.', 'Title', 'Content', 'status', 'last edit'];

      return headerElement.map((key, index) => {
          return <th key={index}>{key.toUpperCase()}</th>
      });
  }

    const renderTodoBody = () => {
      return todoTask && todoTask.map(({ _key, title, content, complete, lastedit },index) => {
          return (
              <tr key={_key}>
                  <td>{index+1}</td>
                  <td>{title}</td>
                  <td>{content}</td>
                  <td><input type="checkbox" checked={complete? "selected" : ""}/></td>
                  <td>{lastedit.substring(0,10)}</td>
                  <td className='opration'>
                      <button onClick={() => removeData(_key)}>delete</button>
                  </td>
              </tr>
          );
      });
    }

    return (
      <div>
          <h2>Complete Tasks</h2>
          <table id='completed' className="styled-table">
              <thead>
                  <tr>{renderCompleteHeader()}</tr>
              </thead>
              <tbody>
                  {renderCompleteBody()}
              </tbody>
          </table>
          <h2>To-Do Tasks</h2>
          <table id='todo' className="styled-table">
              <thead>
                  <tr>{renderTodoHeader()}</tr>
              </thead>
              <tbody>
                  {renderTodoBody()}
              </tbody>
          </table>
          <AddTaskButton />
      </div>
  );
}

export default Tasks;