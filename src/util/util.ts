import { IWordclass } from "./interfaces.ts"

export const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()

export const capitalize = (word: string): string =>  word[0].toUpperCase() + word.substring(1).toLowerCase()

export const randomizeArrayIndex = <T,>(arr: T[]): number => arr.length === 1 ? 0 : Math.round(Math.random()*(arr.length - 1))

export const randomizeArrayElement = <T,>(arr: T[]): T => arr.length === 1 ? arr[0] : arr[randomizeArrayIndex(arr)]

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
    : `Not quite. Correct answer(s) is(are): ${lineUpTranslations(translation)}\n`
}

export const qResultSimpleUI = (correctlyAnswered: boolean, correctAnswer: string) => {
  return correctlyAnswered
    ? `Correct!\n`
    : `Not quite. Correct answer is: ${correctAnswer}\n`
}


// * Callback for misspalling handeling, or something else. Will remove if unused.
export const comparerß = (actual: string, expected: string, callBack?: (actual: string, expected: string) => boolean): boolean => {
  const [ modActual, modExpected ] = [actual, expected].map((str) => str.split(/ß|ss/).join(''))

  return callBack ? callBack(modActual, modExpected) : modActual === modExpected
}

// TODO: add a handler for misspelling