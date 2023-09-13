import { IWordclass } from "./interfaces.ts"

export const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()

export const capitalize = (word: string): string =>  word[0].toUpperCase() + word.substring(1).toLowerCase()

export const questionInputGenericValidation = (word: string, dataObject: IWordclass): boolean => (
  typeof word !== 'string' || word === '' ||
  !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
  !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
)

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


// TODO: add a handler for 'ss' = 'ß'

// TODO: add a handler for misspelling