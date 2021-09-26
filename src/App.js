import './App.css';
import Tasks from './Tasks';
import Search from './Search.js';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from './ebconfig';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Simple To-do Application
      </header>
      <body className="App-body">
        <EasybaseProvider ebconfig={ebconfig}>
          <Search />
          <Tasks />
        </EasybaseProvider>
      </body>
    </div>
  );
};

export default App;
