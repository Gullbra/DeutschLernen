import '../styles/views/toinsert.css'
import { IToInsertProps } from '../interfaces/IProps'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { INounDataObject } from '../interfaces/IWordclasses'
import { mockDataNouns as mockData } from '../util/mockData'

export const ToInsert = ({}: IToInsertProps) => {  
  const [ toBeInserted, setToBeInserted ] = useState<INounDataObject[]>(mockData)
  const [ wordInEdit, setWordInEdit ] = useState({})
  const [ expanded, setExpanded ] = useState<Set<string>>(new Set())

  const navigate = useNavigate()
  const currentUrl = useLocation().pathname

  // useEffect(() => {
  //   if(currentUrl === '/ToInsert')
  //     navigate('/ToInsert/AddWordView')
  // }, [])

  console.log({'hey': <Outlet/>, 'bool': Boolean(<Outlet/>)})

  return (
    <content-wrapper
      class = 'view-toInsert__wrapper dev-border' 
    >
      <p>Hey</p>
      <Outlet/>
      {/* <OverViewView toBeInserted={toBeInserted} expanded={expanded} setExpanded={setExpanded}/> */}

    </content-wrapper>
  )
}
