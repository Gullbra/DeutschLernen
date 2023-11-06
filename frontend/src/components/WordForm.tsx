import React from 'react'
import '../styles/components/MyForm.css'
import { capitalizeWord } from '../util/capitalize';
import { IWord } from '../interfaces/wordsPhrasesGrammar';

export const WordForm = (
  { wordInEdit, setWordInEdit, assignedWords }: 
  { 
    wordInEdit: IWord | null, 
    setWordInEdit: React.Dispatch<React.SetStateAction<IWord | null>>,
    assignedWords: Set<string>
  } 
) => {

  const [ formData, setFormData ] = React.useState<IWord>(wordInEdit || { word: '', weight: 100, classes: [] });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData)
    setWordInEdit(formData)
  }

  const elementsArr = [
    {
      type: "text",
      name: "word",
      value: formData.word
    },
  ]

  return (
    <form onSubmit = {handleSubmit}>

      {elementsArr.map(el => (
        <label className='form__label'>
          {capitalizeWord(el.name) +': '}
          <input type={el.type} name={el.name} value={el.value} onChange={handleInputChange}/>  
        </label>
      ))}

      <button type="submit">Save</button>
    </form>
  );
}

