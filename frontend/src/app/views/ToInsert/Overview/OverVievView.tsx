import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import { IOutletContext } from '../../../../interfaces/IStatesAndContexts'
import { IClassNoun } from '../../../../interfaces/IWordsPhrasesGrammar'


export const OverViewView = () => {
  const navigate = useNavigate()

  const { sessionWordData } = useOutletContext() as IOutletContext
  const [ expanded, setExpanded ] = useState<Set<string>>(new Set())

  const toggleExpanded = (word: string) => {
    const nSet = new Set(expanded)

    nSet.has(word)
      ? nSet.delete(word)
      : nSet.add(word)

    setExpanded(nSet)
  }

  return (
    <>
      <div className='view-toInsert-wrapper__data-list'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems:"center",
          gap: "1rem",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem"
        }}
      >
        <h3>Session Stored Data</h3>

        <div>
          {sessionWordData.map(dataObj => (
            <div key={dataObj.word}>
              <h4
                onClick={() => toggleExpanded(dataObj.word)}
                style={{ cursor: "pointer" }}
              >{`${dataObj.word} ${expanded.has(dataObj.word) ? "-": "+"}`}</h4>

              {expanded.has(dataObj.word) && (
                <div key={`expanded: ${dataObj.word}`}
                  style={{
                    paddingTop: "0.5rem",
                    paddingBottom: "1rem",
                    paddingLeft: "0.6rem"
                  }}  
                >
                  {dataObj.classes.map(wClass => (
                    <div key={dataObj.word + wClass.class}>
                      {wClass.class === "noun" && (<DisplayWCNoun 
                        classObj={wClass as IClassNoun} 
                        expandToggle={() => toggleExpanded(`${dataObj.word}: ${wClass.class}`)}
                        isExpanded={expanded.has(`${dataObj.word}: ${wClass.class}`)}
                      />)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className='' style={{display: "flex", flexDirection: "row", gap: "0.5rem"}}>
        <button onClick={() => navigate('/ToInsert/AddWordView')}>
          {"Add New Word"}
        </button>
        <button onClick={() => console.log('Not implemented')}>
          {"Send Data to Backend (Not Implemented)"}
        </button>
        <button onClick={() => console.log('Not implemented"')}>
          {"Leave Session Without Saving (Not implemented)"}
        </button>
      </div>
    </>
  )
}


const DisplayWCNoun = ({classObj, expandToggle, isExpanded}: {classObj: IClassNoun, expandToggle: () => void, isExpanded: boolean}) => {
  return(
    <>
      <h5 style={{cursor: "pointer"}} onClick={() => expandToggle()}>{`Noun ${isExpanded ? "-": "+"}`}</h5>

      {isExpanded && (
        <div style={{paddingLeft: "0.4rem", marginTop: "0.3rem"}}>
          <p>{`Article: ${classObj.article}`}</p>
          <p>{`Plural: ${classObj.plural}`}</p>
          <p>{`Translation: ${classObj.translation.join(", ")}`}</p>
        </div>
      )}
    </>
  )
}
