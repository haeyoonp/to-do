import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";


function AddTaskButton() {
  const { db, useReturn} = useEasybase();

  const handleAddTaskClick = async () => {
    try {
      const inTitle = prompt("Enter Title");
      const inDescription = prompt("Enter Description");
      const inComplete = false;
      const inLastEdit = Date();
      if (!inTitle || !inDescription) return;

      await db('TASKS').insert({
        title: inTitle,
        content: inDescription,
        complete: inComplete,
        lastEdit: inLastEdit
      }).one();
    } catch (_) {
      alert("Error on input format");
    }
  }

  return (
    <button onClick={handleAddTaskClick} className="AddTaskButton">+ Add Task </button>
  );
}

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
      console.log(JSON.stringify(task));
      return task && task.map(({ _key, title, content, complete, lastedit },index) => {
          return (
              <tr key={_key}>
                  <td>{index}</td>
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
          <h1 id='title'>Task List</h1>
          <table id='task' className="styled-table">
              <thead>
                  <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                  {renderBody()}
              </tbody>
          </table>
      </div>
  )
}
    
export default Tasks;