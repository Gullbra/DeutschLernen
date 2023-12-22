import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import App from './app/App';


import { GraphQLClient, ClientContext } from 'graphql-hooks'

const gqlClient = new GraphQLClient({
  url: `${process.env.REACT_APP_BE_DOMAIN}/api/v1/graphql`
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClientContext.Provider value={gqlClient}>
        <App />
      </ClientContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
