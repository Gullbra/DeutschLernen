import '../styles/views/toinsert.css'
import { IToInsertProps } from '../interfaces/IProps'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { mockDataNouns as mockData } from '../util/mockData'
import { IWord } from '../interfaces/wordsPhrasesGrammar'
import { IOutletContext } from '../interfaces/IStatesAndContexts'
import { fecther } from '../util/fetcher'

export const ToInsert = ({}: IToInsertProps) => {  
  const [ wordsSaved, setWordsSaved ] = useState<IWord[]>(mockData)
  const [ wordInEdit, setWordInEdit ] = useState<Partial<IWord> | null>(null)
  const [ assignedWords, setAssignedWords ] = useState<Set<string>>(new Set(mockData.map(word => word.word)))
  const [ wordsInDb, setWordsInDb ] = useState<Set<string>>(new Set())

  useEffect(() => {
    fecther({ type: "fetch", timeout: 2000 })
      .then(resp => setWordsInDb(resp.data.map((el: {word:string}) => el.word)))
  }, [])

  useEffect(() => {
    setAssignedWords(prev => {
      return new Set([...Array.from(prev), ...Array.from(wordsInDb)])
    })
  }, [wordsInDb])

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
