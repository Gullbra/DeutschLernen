import { IWordclass } from "../interfaces/IWordsPhrasesGrammar"

export const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()

export const lineUpTranslations = (translations: string[]): string => {
  return translations.length > 1
    ? translations.slice(0, -1).map(translation => `"${translation}"`).join(', ') + " and " + `"${translations.slice(-1)}"`
    : `"${translations[0]}"`
}

export const qResultMeaningUI = (correctlyAnswered: boolean, answer: string, translation: string[]): string => {
  return correctlyAnswered
    ? translation.length === 1 
      ? `Correct!\n` 
      : `Correct! More translations: ${lineUpTranslations(translation.filter(el => el !== answer))}\n`
    : translation.length > 1
      ? `Not quite. Correct answers are: ${lineUpTranslations(translation)}\n`
      : `Not quite. Correct answer is: ${lineUpTranslations(translation)}\n`
}

export const qResultSimpleUI = (correctlyAnswered: boolean, correctAnswer: string): string => {
  return correctlyAnswered
    ? `Correct!\n`
    : `Not quite. Correct answer is: ${correctAnswer}\n`
}

/**
 * Replaces "ß" with ss in the strings before comparing them, or calling a callback function.
 */
export const comparerß = (actual: string, expected: string, callBack?: (actual: string, expected: string) => boolean): boolean => {
  const [ modActual, modExpected ] = [actual, expected].map((str) => str.split(/ß/).join('ss'))

  return callBack ? callBack(modActual, modExpected) : modActual === modExpected
}

/**
 * Contracts some preposition + article combinations in the strings before comparing them, or calling a callback function.
 */
export const comparerContractions = (actual: string, expected: string, callBack?: (actual: string, expected: string) => boolean): boolean => {
  // * More contractions: https://german.stackexchange.com/questions/4410/contraction-of-prepositions-and-definite-articles-in-german
  const [ modActual, modExpected ] = [actual, expected].map((str) => {
    return str
      .split(/an dem|am/i).join('am')
      .split(/an das|ans/i).join('ans')
      .split(/auf das|aufs/i).join('aufs')
      .split(/bei dem|beim/i).join('beim')
      // .split(/durch das|durchs/i).join('durchs')
      // .split(/für das|fürs/i).join('fürs')
      // .split(/hinter dem|hinterm/i).join('hinterm')
      // .split(/hinter das|hinters/i).join('hinters')
      .split(/im dem|im/i).join('im')
      .split(/in das|ins/i).join('ins')
      // .split(/über dem|überm/i).join('überm')
      // .split(/über das|übers/i).join('übers')
      // .split(/unter dem|unterm/i).join('unterm')
      // .split(/unter das|unters/i).join('unters')
      // .split(/von dem|vom/i).join('vom')
      // .split(/vor dem|vorm/i).join('vorm')
      // .split(/vor das|vors/i).join('vors')
      .split(/zu dem|zum/i).join('zum')
      .split(/zu der|zur/i).join('zur')
  })

  return callBack ? callBack(modActual, modExpected) : modActual === modExpected
}

// TODO: add a handler for misspelling