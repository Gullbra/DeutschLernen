/**
 * Capitalizes string.
 */
export const capitalizeWord = (word: string): string =>  word.length === 0 ? word : word.length === 1 ? word[0].toUpperCase() : word[0].toUpperCase() + word.substring(1)


/**
 * Capitalizes sentence.
 * @param filters Optional iterable of strings to exclude from capitalization. Casesensitive.
 */
export const capitalizeSentence = (sentence: string, filters?: Iterable<string>): string => {
  if(!filters)
    return sentence.split(' ').map(capitalizeWord).join(' ');

  const filterSet: Set<string> = filters instanceof Set ? filters : new Set(filters) 

  return sentence.split(' ').map((word) => filterSet.has(word) ? word : capitalizeWord(word)).join(' ')
}
