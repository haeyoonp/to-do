
const TodoList = ({data, taskAction}) => {
    //checkTask , removeTask , saveTask
    return data && data.map(({ _key, content}) => {
        return (
          <div className="single-task">
              <button className="check-btn" onClick={() => taskAction[0](_key)}></button>
              <input key={_key} className="task-input" onFocus={(e) => {console.log('Focused on input');}} 
              onBlur={(e) => {taskAction[2](_key, e.target.value)}}
              defaultValue={content}></input>
              <button className="delete-btn" onClick={() => taskAction[1](_key)}></button>
          </div>
        );
    });
  }

export default TodoList;
