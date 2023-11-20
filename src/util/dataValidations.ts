import { IClassAdjective, IClassAdverb, IClassNoun, IClassPreposition, IComparativeAndSuperlative, IWordclass }  from "../interfaces/IWordsPhrasesGrammar"

// * Should return true if data is valid

const isValidWordClassGeneric = (word: string, dataObject: IWordclass): boolean => (
  typeof word === 'string' && word !== '' &&
  typeof dataObject === 'object' && !Array.isArray(dataObject) &&
  ['noun', 'preposition', 'adverb', 'adjective', 'verb'].includes(dataObject.class) &&
  Array.isArray(dataObject.translation) && dataObject.translation.length > 0
)

const isValidDegreesOfComparision = (dataObject: IComparativeAndSuperlative): boolean => (
  !!dataObject.stem && typeof dataObject.stem === 'string' && 
  !!dataObject.examplePhrases && Array.isArray(dataObject.examplePhrases)
)

export const isValidWordClassNoun = (word: string, dataObject: IClassNoun): boolean => (
  isValidWordClassGeneric(word, dataObject) &&
  /[A-ZÄÖÜ]/.test(word[0]) && word.substring(1).toLocaleLowerCase() === word.substring(1) &&
  (dataObject.plural === 'no plural' || (/[A-ZÄÖÜ]/.test(dataObject.plural[0]) && dataObject.plural.substring(1).toLocaleLowerCase() === dataObject.plural.substring(1))) &&
  ['der', 'das', 'die'].includes(dataObject.article) &&
  typeof dataObject.plural === 'string' &&
  !!dataObject.specialDeclensions
)

export const isValidWordClassPreposition = (word: string, dataObject: IClassPreposition): boolean => (
  isValidWordClassGeneric(word, dataObject) &&
  ['akusativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) &&
  Array.isArray(dataObject.commonUses) && dataObject.commonUses.length > 0
)

export const isValidWordClassAdverb = (word: string, dataObject: IClassAdverb) => (
  isValidWordClassGeneric(word, dataObject) &&
  [true, false].includes(dataObject.absoluteAdverb) && 
  (dataObject.absoluteAdverb || isValidDegreesOfComparision(dataObject))
)

export const isValidWordClassAdjective = (word: string, dataObject: IClassAdjective): boolean => {
  console.log("WARNING! Validation NOT fully implemented!")
  return isValidWordClassGeneric(word, dataObject)
}
