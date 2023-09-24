import { IClassAdjective, IClassAdverb, IClassNoun, IClassPreposition, IComparativeAndSuperlative, IDegreeOfComparisonObject, IWordclass } from "./interfaces.ts";

// * Should return true if data is valid

const isValidWordClassGeneric = (word: string, dataObject: IWordclass): boolean => (
  typeof word === 'string' && word !== '' &&
  typeof dataObject === 'object' && !Array.isArray(dataObject) &&
  ['noun', 'preposition', 'adverb', 'adjective', 'verb'].includes(dataObject.class) &&
  Array.isArray(dataObject.translation) && dataObject.translation.length > 0
)

const isValidDegreeOfComparision = (dataObject: IDegreeOfComparisonObject): boolean => (
  typeof dataObject.word === 'string' && dataObject.word !== '' &&
  typeof dataObject.translation === 'string' && dataObject.translation !== '' &&
  Array.isArray(dataObject.useInPhrase) && dataObject.useInPhrase.length > 0
)

const isValidDegreesOfComparision = (dataObject: IComparativeAndSuperlative): boolean => (
  typeof dataObject.comparative === 'object' && !Array.isArray(dataObject.comparative) && 
  isValidDegreeOfComparision(dataObject.comparative)
) && (
  typeof dataObject.superlative === 'object' && !Array.isArray(dataObject.superlative) && 
  isValidDegreeOfComparision(dataObject.superlative)
)

export const isValidWordClassNoun = (word: string, dataObject: IClassNoun): boolean => (
  ['der', 'das', 'die'].includes(dataObject.article) &&
  typeof dataObject.plural === 'string' &&
  isValidWordClassGeneric(word, dataObject)
)

export const isValidWordClassPreposition = (word: string, dataObject: IClassPreposition): boolean => (
  ['akusativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) &&
  Array.isArray(dataObject.commonUses) && dataObject.commonUses.length > 0 && 
  isValidWordClassGeneric(word, dataObject)
)

export const isValidWordClassAdverb = (word: string, dataObject: IClassAdverb) => (
  [true, false].includes(dataObject.absoluteAdverb) && 
  (dataObject.absoluteAdverb || isValidDegreesOfComparision(dataObject)) && 
  isValidWordClassGeneric(word, dataObject)
)

export const isValidWordClassAdjective = (word: string, dataObject: IClassAdjective): boolean => {
  console.log("WARNING! Validation NOT fully implemented!")
  return isValidWordClassGeneric(word, dataObject)
}