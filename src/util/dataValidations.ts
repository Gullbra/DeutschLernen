import { IClassAdjective, IClassAdverb, IClassNoun, IClassPreposition, IComparativeAndSuperlative, IDegreeOfComparisonObject, IWordclass } from "./interfaces.ts";

// * Should return true if data is valid

const validationWordClassGeneric = (word: string, dataObject: IWordclass): boolean => (
  typeof word === 'string' && word !== '' &&
  typeof dataObject === 'object' && !Array.isArray(dataObject) &&
  ['noun', 'preposition', 'adverb', 'adjective', 'verb'].includes(dataObject.class) &&
  Array.isArray(dataObject.translation) && dataObject.translation.length > 0
)

const validationDegreeOfComparision = (dataObject: IDegreeOfComparisonObject): boolean => (
  typeof dataObject.word === 'string' && dataObject.word !== '' &&
  typeof dataObject.translation === 'string' && dataObject.translation !== '' &&
  Array.isArray(dataObject.useInPhrase) && dataObject.useInPhrase.length > 0
)

const validationDegreesOfComparision = (dataObject: IComparativeAndSuperlative): boolean => (
  typeof dataObject.comparative === 'object' && !Array.isArray(dataObject.comparative) && 
  validationDegreeOfComparision(dataObject.comparative)
) && (
  typeof dataObject.superlative === 'object' && !Array.isArray(dataObject.superlative) && 
  validationDegreeOfComparision(dataObject.superlative)
)

export const validationWordClassNoun = (word: string, dataObject: IClassNoun): boolean => (
  ['der', 'das', 'die'].includes(dataObject.article) &&
  typeof dataObject.plural === 'string' &&
  validationWordClassGeneric(word, dataObject)
)

export const validationWordClassPreposition = (word: string, dataObject: IClassPreposition): boolean => (
  ['akusativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) &&
  Array.isArray(dataObject.commonUses) && dataObject.commonUses.length > 0 && 
  validationWordClassGeneric(word, dataObject)
)

export const validationWordClassAdverb = (word: string, dataObject: IClassAdverb) => (
  [true, false].includes(dataObject.absoluteAdverb) && 
  (dataObject.absoluteAdverb || validationDegreesOfComparision(dataObject)) && 
  validationWordClassGeneric(word, dataObject)
)

export const validationWordClassAdjective = (word: string, dataObject: IClassAdjective): boolean => {
  throw new Error("Not implemented!")
  return false
}