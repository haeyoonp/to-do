

const CompleteList = ({data, removeTask}) => {
    return data && data.map(({ _key, content}) => {
        return (
            <div className="complete-task">
                <div className="completed-task">{content}</div>
                <button className="delete-btn" onClick={() => removeTask(_key)}></button>
            </div>
        );
    });
  } 
    
export default CompleteList;

