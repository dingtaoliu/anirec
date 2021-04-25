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
            {/* <div>
                <nav>
                <ul>
                    <li><Link to="/item">Item</Link></li>
                    <li><Link to="/items">Item List</Link></li>
                </ul>
                </nav>    
                <Search></Search>    
            </div>

            <div>
                <switch>
                <Route path="/item"><Item title="NEW ITEM!!!"/></Route>
                <Route path="/items"><ItemList items={dummyItems}/></Route>
                </switch>
            </div> */}
            <Search/>
      </div>
    </div>
  );
}

export default App; 