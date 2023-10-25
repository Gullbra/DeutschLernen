import React from 'react';
import './styles/App.css';
import { fecther } from './util/fetcher';

function App() {
  return (
    <div className="App">
      <h1>hey</h1>

      <button onClick={fecther}>click</button>
    </div>
  );
}

export default App;
