import { useNavigate, useOutletContext } from "react-router-dom"
import { IOutletContext } from "../../../../interfaces/IStatesAndContexts"
import { useEffect, useState } from "react"
import { IClassNoun } from "../../../../interfaces/IWordsPhrasesGrammar"
import { capitalizeWord } from "../../../../util/personalLib/capitalization"

export const AddClassView = () => {
  const navigate = useNavigate()

  const { wordInEdit, setWordInEdit, setWordsSaved } = useOutletContext() as IOutletContext
  const [ wordClassType, setWordClassType ] = useState<string>('')
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
    // eslint-disable-next-line
  }, [])


  const formInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'translation') {
      setFormData({ ...formData, [name]: value.split(',') })
      return
    }

    setFormData({ ...formData, [name]: value });
  }


  const formSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();

    setWordInEdit({...wordInEdit, classes: [...wordInEdit?.classes || [], {...formData, class: wordClassType} ]})
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
    navigate('/ToInsert')
  }

  
  return(
    <>
      <p>Add word class view</p>


      <div className="dev-border">
        {`word: ${wordInEdit?.word}`}
        <button onClick={() => navigate('/ToInsert/AddWordView')}>Edit</button>
      </div>


      <select name="wordClassType" id="wordClassType" defaultValue='default'
        onChange={event => setWordClassType(event.target.value)}
      >
        <option value="default">Select a word class to add</option>
        {["noun", "adverb", "adjective", "preposition"]
          .filter(wordClassStr => !wordInEdit?.classes?.some(wordClassObj => wordClassObj.class === wordClassStr))
          .map(wordClassStr => (
            <option key={wordClassStr} value={wordClassStr}>{capitalizeWord(wordClassStr)}</option>
          ))}
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
  { formData: IClassNoun, formInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, setFormData: React.Dispatch<React.SetStateAction<IClassNoun>> }
) => {
  const elementsArr = [
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
        <label key={key} className='form__label--checkbox'>
          <input type='checkbox' name={key} checked={value} onChange={formDeclInputChange}/>  
          {key +': '}
        </label>
      )
    }

    return (<>{elArr}</>)
  }


  return (
    <>
      <label className='form__label'>
        {'Article: '}
        <select name="article" value={formData.article} onChange={formInputChange}>
          <option value="">Select an article</option>
          {['der', 'das', 'die'].map(article => (
            <option key={article + article} value={article}>{article}</option>
          ))}
        </select>  
      </label>

      {elementsArr.map(el => (
        <label key={el.name + el.value} className='form__label'>
          {capitalizeWord(el.name) +': '}
          <input type={el.type} name={el.name} value={el.value} onChange={formInputChange}/>  
        </label>
      ))}

      <div className="form__decl-inputs-container dev-border">
        <p className="declention-section-header">Special Declensions</p>
        {generateDeclentionBoxes()}
      </div>
    </>
  )
}
