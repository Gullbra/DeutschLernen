import '../../styles/views/toinsert.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { IOutletContext } from '../../interfaces/IStatesAndContexts'
import { useState } from 'react'

export const OverViewView = () => {
  const navigate = useNavigate()

  const { wordsSaved } = useOutletContext() as IOutletContext
  const [ expanded, setExpanded ] = useState<Set<string>>(new Set())

  return (
    <>
      <div className='view-toInsert-wrapper__data-list dev-border'>
        {wordsSaved.map(dataObj => (
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

      <button onClick={() => navigate('/ToInsert/AddWordView')}>
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