import { useNavigate, useOutletContext } from "react-router-dom"
import { IOutletContext } from "../../interfaces/IStatesAndContexts"
import { useEffect, useState } from "react"
import { IClassNoun, INounDeclension, TUnknownWordClass } from "../../interfaces/wordsPhrasesGrammar"
import { capitalizeWord } from "../../util/capitalize"

import '../../styles/views/toInsertChildren/forms.css'

export const AddClassView = () => {
  const navigate = useNavigate()

  const { wordInEdit, setWordInEdit, setWordsSaved } = useOutletContext() as IOutletContext
  const [ wordClassType, setWordClassType ] = useState<string>('noun')
  const [ formData, setFormData ] = useState<IClassNoun>({
    class: '',
    translation: [],
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


  useEffect(() => {
    if(!wordInEdit)
      navigate('/ToInsert')
  }, [])


  const formInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'translation') {
      setFormData({ ...formData, [name]: value.split(',') })
      return
    }

    setFormData({ ...formData, [name]: value });
  }


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
        {
          wordClassType === 'noun' && (<FormInputsNoun formData={formData} formInputChange={formInputChange} setFormData={setFormData}/>)
        }

        <button type="submit">Add class and return to overview</button>
        <button onClick={formCancel}>Cancel</button>
      </form>


      {wordInEdit?.classes && wordInEdit?.classes?.length > 0 && (
        <button onClick={endEditing}>Finish</button>
      )}
    </>
  )
}

const FormInputsNoun = (
  { formData, formInputChange, setFormData }: 
  { formData: IClassNoun, formInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void, setFormData: React.Dispatch<React.SetStateAction<IClassNoun>> }
) => {
  const elementsArr = [
    {
      type: "text",
      name: "article",
      value: formData.article
    },
    {
      type: "text",
      name: "plural",
      value: formData.plural
    },
    {
      type: "text",
      name: "translation",
      value: formData.translation
    },
  ]


  const formDeclInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, specialDeclensions: {...formData.specialDeclensions, [name]: checked }});
  }


  const generateDeclentionBoxes = () => {
    const elArr = []

    for (const [key, value] of Object.entries(formData.specialDeclensions)) {
      elArr.push(
        <label className='form__label--checkbox'>
          <input type='checkbox' name={key} checked={value} onChange={formDeclInputChange}/>  
          {key +': '}
        </label>
      )
    }

    return (<>{elArr}</>)
  }


  return (
    <>
      {elementsArr.map(el => (
        <label className='form__label'>
          {capitalizeWord(el.name) +': '}
          <input key={el.name} type={el.type} name={el.name} value={el.value} onChange={formInputChange}/>  
        </label>
      ))}

      <div className="form__decl-inputs-container dev-border">
        <p className="declention-section-header">Special Declensions</p>
        {generateDeclentionBoxes()}
      </div>
    </>
  )
}
