import { useState } from "react";
import { IClassNoun } from "../../../../../interfaces/IWordsPhrasesGrammar";
//import { Layout } from "../../../../layout/Layout";

import './noun-form.css'

export const NounForm = () => {
  const [ formData, setFormData ] = useState<Omit<IClassNoun, "translation"> & {translation: Set<string>}>({
    class: '',
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


  const formInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'translation') {
      //setFormData({ ...formData, [name]: value.split(',') })
      return
    }

    setFormData({ ...formData, [name]: value });
  }

  const formDeclInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, specialDeclensions: {...formData.specialDeclensions, [name]: checked }});
  }
  
  const formSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    console.log("click!", formData)

    //setWordInEdit({...wordInEdit, classes: [...wordInEdit?.classes || [], {...formData, class: wordClassType} ]})
  }

  const articleChoiceSelected = {
    backgroundColor: "beige"
  }

  const articleChoiceUnselected = {
    backgroundColor: "white"
  }

  return(
    <content-wrapper class='view-toInsert__wrapper dev-border'>
      <p className="dev-border"
        style={{marginTop: "2rem", marginBottom: "2rem", padding: "0.5rem"}}
      >
        Hey this will be the parent view. It will show already saved data and give an option to change it.
      </p>

      <form className="dev-border word-class-form-element" onSubmit={formSubmit}>
        <section className="wc-form-element__section --noun__plural-and-article-section dev-border">
          <label className='form__label' htmlFor="plural">Plural:</label>
          <input type="text" id="plural" name="plural" value={formData.plural} onChange={formInputChange}/>  

          <label className='form__label'>Article:</label> 

          <div style={{ display: "flex", justifyContent: "space-between", flexGrow: "1" }}>
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
          {/* 



          */}
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

        <section className="wc-form-element__section">
          <button type="submit">SaveClass</button>
        </section>
      </form>
    </content-wrapper>
  )
}
