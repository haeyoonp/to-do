import { useEasybase } from 'easybase-react';

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
  };

  return (
    <button onClick={handleAddTaskClick} className="AddTaskButton">+ Add Task </button>
  );
};

export default AddTaskButton;