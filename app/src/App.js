import logo from './logo.svg';
import './App.css';

import { Route, Link } from "react-router-dom";

import Item from './components/Item';
import ItemList from './components/ItemList';

const items = [{title: "digimon"}, {title: "attack on titan"}]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>WELCOME BIG CHUNGUS</h1>
        <div>
          <nav>
            <ul>
              <li><Link to="/item">Item</Link></li>
              <li><Link to="/items">Item List</Link></li>
            </ul>
          </nav>          
        </div>

        <div>
          <switch>
            <Route path="/item"><Item title="NEW ITEM!!!"/></Route>
            <Route path="/items"><ItemList items={items}/></Route>
          </switch>
        </div>
      </header>

    </div>
  );
}

export default App;
