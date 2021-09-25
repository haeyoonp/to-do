import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";
import AddTaskButton from './AddTaskButton.js';

function Tasks() {
    const [task, setTaskData] = useState([]);
    const { db, useReturn} = useEasybase();
    //const { task } = useReturn(() => db("TASKS").return().limit(10).all(), []);

    const mounted = async() => {
      const ebData = await db("TASKS").return().limit(10).all();
      setTaskData(ebData);
    }

    const removeData = async(key) => {
      const del = await db('TASKS', true).delete().where({ _key : key }).one();
      mounted();
   }

    useEffect(() => {
        mounted();
      }, [])
    
    const renderHeader = () => {
        let headerElement = ['No.', 'Title', 'Content', 'complete status', 'last edit date'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    const renderBody = () => {
      return task && task.map(({ _key, title, content, complete, lastedit },index) => {
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
      })
    }

    return (
      <div>
          <AddTaskButton />
          <h2 id='title'>Completed Tasks</h2>
          <table id='task' className="styled-table">
              <thead>
                  <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                  {renderBody()}
              </tbody>
          </table>
          <h2 id='title'>In-Process Tasks</h2>
      </div>
  )
}
    
export default Tasks;