import '../styles/views/toinsert.css'
import { IToInsertProps } from '../interfaces/IProps'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { INounDataObject } from '../interfaces/IWordclasses'
import { mockDataNouns as mockData } from '../util/mockData'
import { IStateExpanded } from '../interfaces/IStates'

export const OverViewView = ({toBeInserted, expanded, setExpanded}: {toBeInserted: INounDataObject[]} & IStateExpanded) => {
  const navigate = useNavigate()

  return (
    <>
      <div className='view-toInsert-wrapper__data-list dev-border'>
        {toBeInserted.map(dataObj => (
          <div className='data-list__list-item dev-border' key={dataObj.word}
            onClick={() => setExpanded(prev => {
              const nSet = new Set(prev)

              nSet.has(dataObj.word)
                ? nSet.delete(dataObj.word)
                : nSet.add(dataObj.word)

              return nSet
            })}
          >
            {dataObj.word}
            <div className={expanded.has(dataObj.word) ? '--data-list-open': '--data-list-closed'}>
              {dataObj.classes.map(wordClass => (
                <div key={wordClass.class}>{
    `
    word class: ${wordClass.class}
    ${(() => {
    let desc = ''
    for(const [key, value] of Object.entries(wordClass)) {
    desc += `${key}: ${value}\n`
    }
    return desc
    })()}
    `
                }</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/ToInsert/NewData')}>
        add word
      </button>
      <button onClick={() => console.log('Not implemented')}>
        send in data
      </button>
      <button onClick={() => console.log('Not implemented')}>
        return without sending
      </button>
    </>
  )
}