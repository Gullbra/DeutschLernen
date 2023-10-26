import React, { FormEvent } from 'react';

import './styles/base.css';

import { MyForm } from './components/MyForm'

// import { fecther } from './util/fetcher';

function App() {
  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    console.log('click', event)
  }

  return (
    <>
      {/* <div className="App">
        <h1>hey</h1>


        <button onClick={fecther}>click</button>
      </div> */}
      <h1>Form below</h1>

      <MyForm />
    </>
  );
}

export default App;
