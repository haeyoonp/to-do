import './App.css';
import Tasks from './Tasks';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect } from 'react';
import ebconfig from './ebconfig';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        To-Do Lists
      </header>
      <body className="App-body">
        <EasybaseProvider ebconfig={ebconfig}>
          <Tasks />
        </EasybaseProvider>
      </body>
    </div>
  );
}

export default App;
