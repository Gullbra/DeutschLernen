import { useNavigate } from 'react-router-dom'

import './home.css'
import { IHomeViewProps } from '../../../interfaces/IProps'


export const HomeView = ({serverRunning}:IHomeViewProps) => {
  const navigate = useNavigate()
  
  return (
    <content-wrapper
      class = 'view-Home__wrapper' 
    >
      
      <div>
        <h3>Server running: 
          <span style={{ color: serverRunning === null ? 'yellow': !!serverRunning ? 'green' : 'red'}} >
            {` ${serverRunning === null ? 'checking' : serverRunning}`}
          </span>
        </h3>
      </div>

      <button style={{marginTop: '2rem'}} onClick={() => navigate('/ToInsert')}>
        Add data
      </button>

    </content-wrapper>
  )
}
