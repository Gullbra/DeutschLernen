import './toinsert.css'
import './forms.css'

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from 'graphql-hooks'

import { IToInsertProps } from '../../../interfaces/IProps'
import { IWord } from '../../../interfaces/IWordsPhrasesGrammar'
import { IOutletContext } from '../../../interfaces/IStatesAndContexts'

import { mockDataNouns as mockData } from '../../../util/mockData'
//import { fecther } from '../../../util/fetcher'


export const ToInsert = ({}: IToInsertProps) => {  
  const [ sessionWordData, setSessionWordData ] = useState<IWord[]>(mockData)
  const [ wordInEdit, setWordInEdit ] = useState<Partial<IWord> | null>(null)
  const [ assignedWords, setAssignedWords ] = useState<Set<string>>(new Set(mockData.map(word => word.word)))

  const { loading, error, data } = useQuery(`
    {
      getDataList {
        word
      }
    }
    `, {
    variables: {}
  })

  // if (loading) return 'Loading...'
  // if (error) return 'Something Bad Happened'


  useEffect (() => {
    if(!error && !loading) {
      setAssignedWords(prev => {
        return new Set([...Array.from(prev), ...Array.from(data as {word:string}[], obj => obj.word)])
      })
    }
  }, [data])


  // useEffect(() => {
  //   fecther({ type: "fetch", timeout: 2000 })
  //     .then(resp => setWordsInDb(resp.data.map((el: {word:string}) => el.word)))
  // }, [])

  // useEffect(() => {
  //   setAssignedWords(prev => {
  //     return new Set([...Array.from(prev), ...Array.from(wordsInDb)])
  //   })
  // }, [wordsInDb])

  const outletContext: IOutletContext = {
    sessionWordData, setSessionWordData,
    wordInEdit, setWordInEdit,
    assignedWords, setAssignedWords
  }

  return (
    <content-wrapper
      class = 'view-toInsert__wrapper' 
    >
      <h2>Insert New Words in Database</h2>
      <Outlet context={outletContext}/>

    </content-wrapper>
  )
}
