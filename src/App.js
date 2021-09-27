import './App.css';
import Tasks from './Tasks';
import SearchBar from './SearchBar.js';
import { EasybaseProvider} from 'easybase-react';
import { useState } from "react";
import ebconfig from './ebconfig';


function App() {
  const [input, setInput] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        Simple To-do Application
      </header>
      <div className="App-body">
        <EasybaseProvider ebconfig={ebconfig}>
          <SearchBar setInput={setInput}/>
          <Tasks input={input}/>
        </EasybaseProvider>
      </div>
    </div>
  );
};

export default App;
