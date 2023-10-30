import { useNavigate } from 'react-router-dom'

import { IHomeViewProps } from '../interfaces/IProps'
import '../styles/views/home.css'

export const HomeView = ({}: IHomeViewProps) => {
  const navigate = useNavigate()

  return (
    <content-wrapper
      class = 'view-Home__wrapper dev-border' 
    >
      Hey

      <button onClick={() => navigate('/ToInsert')}>
        Add data
      </button>
    </content-wrapper>
  )
}
