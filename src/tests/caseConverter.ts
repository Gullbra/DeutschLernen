import { IClassNoun } from "../util/interfaces.ts";

export interface IConvertedNoun { article: string, noun: string }

const akusativConversion = (article: string, noun: string, plural: boolean): IConvertedNoun => {
  const returnObj = {
    article,
    noun,
  }

  if (plural) {
    returnObj.article = 'die'
  } else if (article === 'der') {
    returnObj.article = 'den'
  }

  return returnObj
}

const dativConversion = (article: string, noun: string, plural: boolean): IConvertedNoun => {
  const returnObj = {
    article: article,
    noun
  }

  if (plural) {
    returnObj.article = 'den'
  }
  else if (['der', 'das'].includes(article)) {
    returnObj.article = 'dem'
  }
  else if (article === 'die') {
    returnObj.article = 'der'
  }

  return returnObj
}

const genetivConversion = (article: string, noun: string, plural: boolean, regular: boolean): IConvertedNoun => {
  if (!regular) throw new Error("Not implemented!")

  const returnObj = {
    article,
    noun,
  }

  if (plural) {
    returnObj.article = 'der'
  } else if (['der', 'das'].includes(article)) {
    returnObj.article = 'des'

    if (['s', 'ß', 'x', 'z'].includes(noun[noun.length-1])) {
      returnObj.noun += 'es'
    } else {
      returnObj.noun += 's'
    }
  } else if (article === 'die') {
    returnObj.article = 'der'
  }

  return returnObj
}

export const caseConverterNoun = (article: string, noun: string, plural: boolean, regular: boolean, toCase: string): IConvertedNoun => {
  if (!['akusativ', 'dativ', 'genetiv'].includes(toCase))
    throw new Error("Error: Case conversion: Invalid case");

  switch (toCase) {
    case "akusativ":
      return akusativConversion(article, noun, plural)
    case "dativ":
      return dativConversion(article, noun, plural)
    case "genetiv":
      return genetivConversion(article, noun, plural, regular)
  
    default:
      break;
  }

  return { article: "", noun: "" }
}