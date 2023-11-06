import { useNavigate, useOutletContext } from "react-router-dom"
import { IOutletContext } from "../../interfaces/IStatesAndContexts"
import { useEffect, useState } from "react"
import { IClassNoun, TUnknownWordClass } from "../../interfaces/wordsPhrasesGrammar"

export const AddClassView = () => {
  const navigate = useNavigate()

  const { wordInEdit, setWordInEdit, setWordsSaved } = useOutletContext() as IOutletContext
  const [ wordClassType, setWordClassType ] = useState<string>('noun')
  const [ formData, setFormData ] = useState<IClassNoun>({
    class: '',
    translation: [],
    article: '',
    plural: '',
    specialDeclensions: {}
  });


  useEffect(() => {
    if(!wordInEdit)
      navigate('/ToInsert')
  }, [])


  const formSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    console.log('Click - form submit', formData)
  }


  const formCancel = () => {
    setWordInEdit(null)
    navigate('/ToInsert')
  }


  const endEditing = () => {
    if (!(
      wordInEdit && wordInEdit?.word && wordInEdit?.weight && wordInEdit?.classes
    )) {
      return alert('some how invalid wordObject')
    }

    /** Workaround for TypeScript bug in typechecking */
    const { word, weight, classes } = wordInEdit

    setWordsSaved(prev => [...prev, { word, weight, classes }])
  }

  
  return(
    <>
      <p>Add word class view</p>


      <div className="dev-border">
        {`word: ${wordInEdit?.word}`}
        <button onClick={() => navigate('/ToInsert/AddWordView')}>Edit</button>
      </div>


      <select name="wordClassType" id="wordClassType" onChange={event => setWordClassType(event.target.value)}>
        <option value="noun">Noun</option>
        <option value="adverb">Adverb</option>
        <option value="adjective">Adjective</option>
        <option value="preposition">Preposition</option>
      </select>


      <form onSubmit={formSubmit}>




        <button type="submit">Add class and return to overview</button>
        <button onClick={formCancel}>Cancel</button>
      </form>


      {wordInEdit?.classes && wordInEdit?.classes?.length > 0 && (
        <button onClick={endEditing}>Finish</button>
      )}
    </>
  )
}