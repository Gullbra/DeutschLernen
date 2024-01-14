import { useState } from "react";
import { IClassNoun } from "../../../../../interfaces/IWordsPhrasesGrammar";

import './noun-form.css'

export const NounForm = (
  //props: { setParentState: React.Dispatch<React.SetStateAction<IClassNoun[]>> }
) => {
  const [ formData, setFormData ] = useState<Omit<IClassNoun, "translation"> & {translation: Set<string>}>({
    class: 'noun',
    translation: new Set(["these", "words", "are", "mock", "values", "one really long translation here"]),
    article: '',
    plural: '',
    specialDeclensions: {
      nGeneral: false,
      enGeneral: false,
      nsGenitiv: false,
      sesGenetiv: false,
      esGenetivForced: false
    }
  });
  const [ workingTrans, setWorkingTrans ] = useState<string>("")


  const handleFormInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [event.target.name]: event.target.value });
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    const wordClass: IClassNoun = {
      ...formData,
      translation: Array.from(formData.translation)
    }

    //props.setParentState(prev => [...prev, wordClass])
  }

  const articleChoiceSelected = { backgroundColor: "beige" }
  const articleChoiceUnselected = { backgroundColor: "white" }

  return(
    // <content-wrapper class='view-toInsert__wrapper dev-border'>
    //   <p className="dev-border"
    //     style={{marginTop: "2rem", marginBottom: "2rem", padding: "0.5rem"}}
    //   >
    //     Hey this will be the parent view. It will show already saved data and give an option to change it.
    //   </p>

      <form className="dev-border word-class-form-element" onSubmit={handleFormSubmit}>
        <section className="wc-form-element__section --noun__plural-and-article-section">
          <div className="--grid-element-wrapper">
            <label className='form__label' htmlFor="plural">Plural:</label>
          </div>

          <div className="--grid-element-wrapper">
            <input type="text" id="plural" name="plural" value={formData.plural} onChange={handleFormInputChange} style={{width: "100%", padding: "0.2rem 0.3rem"}}/>  
          </div>

          <div className="--grid-element-wrapper">
            <label className='form__label'>Article:</label> 
          </div>

          <div className="--grid-element-wrapper" style={{ display: "flex", justifyContent: "space-between", flexGrow: "1" }}>
            <button
              type="button"
              onClick={() => setFormData({...formData, article: "der"})} 
              style={formData.article === "der" ? articleChoiceSelected : articleChoiceUnselected}>der</button>
            <button
              type="button"
              onClick={() => setFormData({...formData, article: "das"})} 
              style={formData.article === "das" ? articleChoiceSelected : articleChoiceUnselected}>das</button>
            <button
              type="button"
              onClick={() => setFormData({...formData, article: "die"})} 
              style={formData.article === "die" ? articleChoiceSelected : articleChoiceUnselected}>die</button>
          </div>
        </section>

        <section 
          className="wc-form-element__section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem"
          }}
        >
          <h4>Translations</h4>

          {formData.translation.size > 0 && (
            <div>
              {Array.from(formData.translation).map(translation => (
                <div key={translation} style={{ display: "flex", flexDirection: "row", gap: "1rem", alignItems: "center" }}>
                  <p>{translation}</p>
                  <button
                    style={{ 
                      height: "auto", 
                      border: "none",
                      padding: "0"
                    }}
                    onClick={() => setFormData(prev => {
                      const newState = {...prev}
                      prev.translation.delete(translation)
                      return newState
                    })}
                  >X</button>
                </div>
              ))}
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems:"center",
              gap: "0.5rem"
            }}
          >

            <input type="text"
              style={{ width: "100%"}}
              id="translation" name="translation" value={workingTrans} onChange={event => setWorkingTrans(event.target.value)}
            />
            <button
              style={{ width: "fit-content"}}
              type="button"
              onClick={() => {
                setFormData(prev => {
                  const newState = {...prev}
                  newState.translation.add(workingTrans)
                  return newState
                })
                setWorkingTrans("")
              }}
            >
              Add new translation
            </button>

          </div>
        </section>

        <section className="wc-form-element__section"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem"
          }}
        >
          <h4>Special Declensions</h4>

          <div
            style={{
              display: "flex",
              flexDirection: "column",

            }}
          >
            <button
              style={formData.specialDeclensions.nGeneral ? articleChoiceSelected : articleChoiceUnselected}
              type="button" 
              onClick={() => setFormData(prev => {return {...prev, specialDeclensions: {...prev.specialDeclensions, nGeneral: !prev.specialDeclensions.nGeneral}}})}
            >{"test: n-general"}</button>
            <button
              style={formData.specialDeclensions.enGeneral ? articleChoiceSelected : articleChoiceUnselected}
              type="button" 
              onClick={() => setFormData(prev => {return {...prev, specialDeclensions: {...prev.specialDeclensions, enGeneral: !prev.specialDeclensions.enGeneral}}})}
            >{"test: en-general"}</button>
            <button
              style={formData.specialDeclensions.nsGenitiv ? articleChoiceSelected : articleChoiceUnselected}
              type="button" 
              onClick={() => setFormData(prev => {return {...prev, specialDeclensions: {...prev.specialDeclensions, nsGenitiv: !prev.specialDeclensions.nsGenitiv}}})}
            >{"test: ns-genetiv"}</button>
            <button
              style={formData.specialDeclensions.sesGenetiv ? articleChoiceSelected : articleChoiceUnselected}
              type="button" 
              onClick={() => setFormData(prev => {return {...prev, specialDeclensions: {...prev.specialDeclensions, sesGenetiv: !prev.specialDeclensions.sesGenetiv}}})}
            >{"test: sesGenetiv"}</button>
            <button
              style={formData.specialDeclensions.esGenetivForced ? articleChoiceSelected : articleChoiceUnselected}
              type="button" 
              onClick={() => setFormData(prev => {return {...prev, specialDeclensions: {...prev.specialDeclensions, esGenetivForced: !prev.specialDeclensions.esGenetivForced}}})}
            >{"test: esGenetivForced"}</button>
          </div>

          {/**
           * draggable and droppable
           * https://dndkit.com/
           */}
          
        </section>


        <section className="wc-form-element__section">
          <button type="submit">SaveClass</button>
        </section>
      </form>
    // </content-wrapper>
  )
}
