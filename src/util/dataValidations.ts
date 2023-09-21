import { IClassAdverb, IClassNoun, IClassPreposition, IDegreeOfComparisonObject, IWordclass } from "./interfaces.ts";


export const validationWordClassGeneric = (word: string, dataObject: IWordclass): boolean => (
  typeof word !== 'string' || word === '' ||
  !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
  !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
)

export const validationWordClassNoun = (dataObject: IClassNoun): boolean => (
  !dataObject.article || typeof dataObject.article !== 'string' || !(dataObject.article === 'der' || dataObject.article === 'das' || dataObject.article === 'die')
)

export const validationWordClassPreposition = (dataObject: IClassPreposition): boolean => (
  !dataObject.forcesCase || !['akusativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) ||
  !dataObject.commonUses || !Array.isArray(dataObject.commonUses) || dataObject.commonUses.length === 0
)

export const validationWordClassAdverb = (word: string, dataObject: IClassAdverb) => {
  if (
    !(dataObject.comparative && dataObject.comparative.word && dataObject.comparative.translation 
    && dataObject.comparative.useInPhrase && Array.isArray(dataObject.comparative.useInPhrase) && dataObject.comparative.useInPhrase.length > 0)
  ){
    console.log(`Invalid "comparative" for adverb ${word}`); return false;
  }
  if (
    !(dataObject.superlative && dataObject.superlative.word && dataObject.superlative.translation 
    && dataObject.superlative.useInPhrase && Array.isArray(dataObject.superlative.useInPhrase) && dataObject.superlative.useInPhrase.length > 0)
  ){
    console.log(`Invalid "superlative" for adverb ${word}`); return false;
  }
  return true
}

export const validationDegreeOfComparisionObject = (degreeOfComparision: IDegreeOfComparisonObject): boolean => (
  Boolean(degreeOfComparision.word) && Boolean(degreeOfComparision.translation) && degreeOfComparision.useInPhrase && Array.isArray(degreeOfComparision.useInPhrase) && degreeOfComparision.useInPhrase.length > 0
)