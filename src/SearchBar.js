
const SearchBar = ({setInput}) => {
    const BarStyling = {width:"15rem",background:"rgb(228 228 228)", border:"none", padding:"0.5rem"};
    return (
        <span>
            <input style={BarStyling} id="search-bar" 
                placeholder={"enter keyword "}
                onChange={(e) => setInput(e.target.value)}
            />
       </span>
    );
  } 
    
export default SearchBar;