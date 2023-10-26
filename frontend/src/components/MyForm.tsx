import React from 'react'

import '../styles/components/MyForm.css'

import { capitalizeWord } from '../util/capitalize';

interface IFormData {
  name: string;
  age: number;
}

export interface IWord {
  word: string,
  weight: number,
}

export const MyForm = (
  //{ onSubmit }: FormProps
) => {
  const [ formData, setFormData ] = React.useState<IFormData>({ name: '', age: 0 });

  const onSubmit = (formData: IFormData) => {
    console.log(formData)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit(formData);
  }

  const elementsArr = [
    {
      type: "text",
      name: "name",
      value: formData.name
    },
    {
      type: "number",
      name: "age",
      value: formData.age
    }

  ]

  return (
    <form onSubmit = {handleSubmit}>

      {elementsArr.map(el => (
        <label className='form__label'>
          {capitalizeWord(el.name) +': '}
          <input type={el.type} name={el.name} value={el.value} onChange={handleInputChange}/>  
        </label>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

