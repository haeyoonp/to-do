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
        product_name: inDescription,
        complete: inComplete,
        lastEdit: inLastEdit
      }).one();
    } catch (_) {
      alert("Error on input format");
    }
  }

  return (
    <button onClick={handleAddTaskClick} className="AddTaskButton">+ Add Task </button>
  )
}

function Tasks() {
    const [task, setTaskData] = useState([]);
    const { db, useReturn} = useEasybase();

    const mounted = async() => {
      const ebData = await db("TASKS").return().limit(10).all();
      setTaskData(ebData);
    }

    const removeData = async(id) => {
      const del = await db('TASKS', true).delete().where({ id : id }).one();
      mounted();
   }

   function AddTaskButton({ callback }) {
    const { db } = useEasybase();
  }

    useEffect(() => {
        console.log("render");
        mounted();
      }, [])

    const renderHeader = () => {
        let headerElement = ['id', 'Title', 'Content', 'complete status', 'last edit date']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    const renderBody = () => {
      return task && task.map(({ id, title, content, complete, lastedit }) => {
          return (
              <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{content}</td>
                  <td>{complete}</td>
                  <td>{lastedit}</td>
                  <td className='opration'>
                      <button onClick={() => removeData(id)}>Delete</button>
                  </td>
              </tr>
          )
      })
    }

    return (
      <div>
          <AddTaskButton />
          <h1 id='title'>Tast List</h1>
          <table id='task'>
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