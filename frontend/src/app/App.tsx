import React, { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import { fecther } from '../util/fetcher'
import { toastPromiseWrapper } from '../util/toastifyBaseConfig';

import { Layout } from './layout/Layout';
import { AppRouting } from './router/AppRouting'

import './base.css';
import './fonts.css';


// * For preventing useEffect to run twice due to reacts React.StrictMode double-mount in dev mode. 
let firstRender = true

function App() {
  console.log(process.env.REACT_APP_BE_DOMAIN)

  const [ serverRunning, setServerRunning ] = useState<boolean | null>(null)
  const [ fetchingInProgress, setFetchingInProgress ] = useState<boolean | null>(null)

  useEffect(() => {
    if(serverRunning === null && fetchingInProgress === null && !!firstRender) {
      setFetchingInProgress(true); firstRender = false;
      const timeOutLimit = 5000

      toastPromiseWrapper (
        fecther(timeOutLimit), 
        timeOutLimit, 
        'Checking connection to server...',
        'Server found!',
        "server down."
      )
        .then(() => setServerRunning(true))
        .catch(() => setServerRunning(false))
        .finally(() => setFetchingInProgress(false))
    }
  }, [serverRunning, fetchingInProgress])


  return (
    <Layout>
      <AppRouting serverRunning={serverRunning}/>

      <ToastContainer/>
    </Layout>
  );
}

export default App;
