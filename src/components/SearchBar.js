
const SearchBar = ({setInput}) => {
    return (
        <span>
            <input className="search-bar"
                placeholder={"enter keyword "}
                onChange={(e) => setInput(e.target.value)}
            />
       </span>
    );
  } 
    
export default SearchBar;