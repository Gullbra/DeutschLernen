import '../styles/views/toinsert.css'
import { IToInsertProps } from '../interfaces/IProps'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { mockDataNouns as mockData } from '../util/mockData'
import { IWord } from '../interfaces/wordsPhrasesGrammar'
import { IOutletContext } from '../interfaces/IStatesAndContexts'

export const ToInsert = ({}: IToInsertProps) => {  
  const [ wordsSaved, setWordsSaved ] = useState<IWord[]>(mockData)
  const [ wordInEdit, setWordInEdit ] = useState<Partial<IWord> | null>(null)
  const [ assignedWords, setAssignedWords ] = useState<Set<string>>(new Set(mockData.map(word => word.word)))

  const outletContext: IOutletContext = {
    wordsSaved, setWordsSaved,
    wordInEdit, setWordInEdit,
    assignedWords, setAssignedWords
  }

  return (
    <content-wrapper
      class = 'view-toInsert__wrapper dev-border' 
    >
      <p>Hey this is the parent View</p>
      <Outlet context={outletContext}/>

    </content-wrapper>
  )
}
