import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from "react";

function Search() {
    const [task, setTaskData] = useState([]);
    const { db, e, useReturn} = useEasybase();
    const [input, setInput] = useState('');

    const updateList = async () => {
        var input = document.getElementById('search_bar').value 
        if(!input || input.length == "")
            setTaskData([]);
        else{
            const searched = await db("TASKS").return().where(e.like("title","%"+input+"%") || e.like("content","%"+input+"%")).all()
            setTaskData(searched);
        }
    }
    useEffect(() => {
        updateList("");
      }, []);
    
    const renderHeader = () => {
        let headerElement = ['Title', 'Content', 'complete status', 'last edit date'];

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }

    const renderBody = () => {
        if(task && task.length == 0)
            return <div>No results found</div>;

        return task && task.length == 0 && task.map(({ title, content, complete, lastedit }) => {
                return (
                    <tr>
                        <td>{title}</td>
                        <td>{content}</td>
                        <td>{complete? "Completed" : "Incomplete"}</td>
                        <td>{lastedit.substring(0,10)}</td>
                    </tr>
                );
            })
    }

    const SearchBar = () => {
        const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
        return (
            <span>
                <input style={BarStyling} id="search_bar" value={input} 
                    placeholder={"enter keyword for title or content "} // writer? date ? 
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" onClick={updateList}>Search</button>
           </span>
        );
      }  

    return (
      <div>
          {SearchBar()}
          <table id='search_result' className="styled-table">
              <thead>
                  <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                  {renderBody()}
              </tbody>
          </table>
      </div>
  );
}
    
export default Search;