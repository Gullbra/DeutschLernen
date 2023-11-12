import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fecther } from '../util/fetcher'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import '../styles/views/home.css'

// ! For preventing useEffect to run twice due to reacts React.StrictMode double-mount in dev mode. 
let firstRender = true

export const HomeView = () => {
  const [ serverRunning, setServerRunning ] = useState<boolean | null>(null)
  const [ fetchingInProgress, setFetchingInProgress ] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if(
      serverRunning === null && fetchingInProgress === null 
      // ! For preventing useEffect to run twice due to reacts React.StrictMode double-mount in dev mode. 
      && !!firstRender
    ) {
      // ! For preventing useEffect to run twice due to reacts React.StrictMode double-mount in dev mode. 
      firstRender = false
      setFetchingInProgress(true)

      toast.promise(
        fecther({type: 'test', timeout: 5000}),
        {
          pending: {
            render(){return 'Checking connection to server...'},
            autoClose: 5000
          },
          success: 'Server found!',
          error: "server down."
        },
        {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
      .then(() => {setServerRunning(true)})
      .catch(() => {setServerRunning(false)})
      .finally(() => setFetchingInProgress(false))
    }
  }, [serverRunning, fetchingInProgress])

  return (
    <content-wrapper
      class = 'view-Home__wrapper dev-border' 
    >
      
      <button onClick={() => navigate('/ToInsert')}>
        Add data
      </button>

      <div>
        {`Server running: ${serverRunning === null ? 'checking' : serverRunning}`}
      </div>

      <ToastContainer/>

    </content-wrapper>
  )
}
