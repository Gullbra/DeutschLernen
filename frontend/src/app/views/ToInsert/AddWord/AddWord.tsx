import { useNavigate, useOutletContext } from "react-router-dom"
import { IOutletContext } from "../../../../interfaces/IStatesAndContexts"
import { useState } from "react";
import { IWord } from "../../../../interfaces/IWordsPhrasesGrammar";

export const AddWordView = () => {
  const navigate = useNavigate()

  const { wordInEdit, setWordInEdit, assignedWords } = useOutletContext() as IOutletContext

  const [ formData, setFormData ] = useState<Partial<IWord>>(wordInEdit || { word: '', weight: 100, classes: [] });


  const formSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    if (!formData.word || assignedWords.has(formData.word)) {
      alert("Word already exist in db!")
      return
    }

    setWordInEdit(formData)
    navigate('/ToInsert/AddClassView')
  }


  const formInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  const formCancel = () => {
    setWordInEdit(null)
    navigate('/ToInsert')
  }

  
  return(
    <>
      <p>Add word view</p>

      <form onSubmit={formSubmit} className="dev-border">
        <label className='form__label'>
          {'Word: '}
          <input type='text' name='word' value={formData.word} onChange={formInputChange} required/>  
        </label>
        <button type="submit">Add a word class</button>
        <button type="button" onClick={formCancel}>Cancel</button>
      </form>
    </>
  )
}