import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <form>
            <input
                type="search"
                name="q"
            ></input>
            <input
                type="submit"
                value="Search"
            ></input>
        </form>
    </div>
  );
}

export default App;
