/**
 * Capitalizes string.
 */
export const capitalizeWord = (word: string): string =>  word.length === 0 ? word : word.length === 1 ? word[0].toUpperCase() : word[0].toUpperCase() + word.substring(1)