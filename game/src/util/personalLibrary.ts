/**
 * Capitalizes string.
 */
export const capitalizeWord = (word: string): string =>  word.length === 0 ? word : word.length === 1 ? word[0].toUpperCase() : word[0].toUpperCase() + word.substring(1)

/**
 * Capitalizes sentence.
 * @param filters Optional array of words to exclude from capitalization. Casesensitive.
 */
export const capitalizeSentence = (sentence: string, filters?: string[]): string => {
  return !filters
    ? sentence.split(' ').map(capitalizeWord).join(' ')
    : sentence.split(' ').map((word) => filters.includes(word) ? word : capitalizeWord(word)).join(' ')
}

/**
 * Returns a pseudorandom integer within an inclusive range.
 *  * 2 args: returns integer between the lowest and the highest arg. 
 *  * 1 args: returns integer between the arg and zero.
 *  * 0 args: returns 1 or 0.
 * @params Expects 2, 1 or 0 numbers.
 * @returns pseudorandom integer. Uses Math.random.
 */
export const randomizeInt = (firstLimit?: number, secondLimit?: number): number => {
  if (!!firstLimit && !!secondLimit) {
    const [ high, low ] = [ Math.max(firstLimit, secondLimit), Math.min(firstLimit, secondLimit) ]
    return low + Math.round(Math.random()*(high - low))
  }

  if (!!firstLimit)
    return Math.round(Math.random()*(firstLimit))

  return Math.round(Math.random())
}

/**
 * Returns a pseudorandomized index value from the given array. Returns -1 for empty array.
 * @param arr Indexed object.
 */
export const randomizeArrayIndex = <T,>(arr: T[]): number => arr.length === 0 ? -1 : arr.length === 1 ? 0 : randomizeInt(arr.length - 1)

/**
 * Returns a pseudorandomized element from the given array. Throws an error for empty array.
 * @param arr Indexed object.
 */
export const randomizeArrayElement = <T,>(arr: T[]): T => {
  if(arr.length === 0)
    throw new RangeError('Can not return random element from an empty array!')

  return arr.length === 1 ? arr[0] : arr[randomizeArrayIndex(arr)]
}


export class MapExpanded<K,V> extends Map<K,V> {
  /** @returns a boolean indicating whether one or more elements in a specified iterable also exists in the Map as a key. */
  hasAny(iterable: Iterable<K>): boolean {
    for (let el of iterable)
      if (super.has(el))
        return true;

    return false;
  }
  
  /** @returns a boolean indicating whether all elements in a specified iterable also exists in the Map as a key. */
  hasAll(iterable: Iterable<K>): boolean {
    for (let el of iterable)
      if (!super.has(el))
        return false;

    return true;
  }
}