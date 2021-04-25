import './App.css';

import { Route, Link } from "react-router-dom";
import Search from './pages/SearchPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div>
        <h1>Find your favourite content</h1>
            <Search/>
      </div>
    </div>
  );
}

export default App; 