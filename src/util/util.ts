export const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()

export const capitalize = (word: string): string =>  word[0].toUpperCase() + word.substring(1).toLowerCase()

// TODO: add a handler for 'ss' = 'ß'

// TODO: add a handler for misspelling