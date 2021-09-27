

const CompleteList = ({data, removeTask}) => {
    return data && data.map(({ _key, content, complete}) => {
        return (
            <div key={_key} className="complete-task">
                <div className="completed-task">{content}</div>
                <button className="delete-btn" onClick={() => removeTask(_key, complete)}></button>
            </div>
        );
    });
  } 
    
export default CompleteList;

