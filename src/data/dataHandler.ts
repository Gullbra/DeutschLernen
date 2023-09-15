import fs from 'fs'
import path from "path";
import { IWord, TDataArray } from '../util/interfaces.ts';

export class DataHandler {
  async getData (filters?: string[]): Promise<TDataArray> {
    return filters 
      ? this.applyFilters ([], (await this.jsonGet()))
      : this.jsonGet()
  }

  async saveData (originalData: TDataArray, toBeChanged: TDataArray) {
    return this.jsonSave(originalData, toBeChanged)
  }

  applyFilters (filters: string[], data: TDataArray): TDataArray {
    return data.reduce((prev, current) => { 
      const currentClasses = current.classes.filter(classObj => filters.includes(classObj.class))

      return currentClasses.length > 0
        ? [...prev, {...current, classes: currentClasses}]
        : prev
    }, [] as TDataArray)
  }

  private async jsonGet (): Promise<TDataArray> {
    return (await Promise.all([
      this.jsonReader('nouns'), 
      this.jsonReader('others'), 
      this.jsonReader('prepositions')
    ])).flat()
  }

  private async jsonSave (originalDataArr: TDataArray, toBeChangedArr: TDataArray): Promise<void> {
    const dataNouns: TDataArray = []
    const dataOthers: TDataArray = []
    const dataPrepositions: TDataArray = []

    const classSorting = (wordObject: IWord) => {
      if (wordObject.classes.filter(classObject => classObject.class === 'noun').length > 0) {
        return dataNouns.push(wordObject)
      } else if (wordObject.classes.filter(classObject => classObject.class === 'preposition').length > 0) {
        return dataPrepositions.push(wordObject)
      }
      return dataOthers.push(wordObject)
    }

    originalDataArr.forEach(originalDataObj => {
      const changedDataObj = toBeChangedArr.find((toBeChangedDataObj) => toBeChangedDataObj.word === originalDataObj.word)

      changedDataObj
        ? classSorting(changedDataObj)
        : classSorting(originalDataObj)
    })

    await Promise.all([
      this.jsonWriter('nouns', dataNouns),
      this.jsonWriter('others', dataOthers),
      this.jsonWriter('prepositions', dataPrepositions),
    ]).catch(err => console.log(`Error in write to JSON: ${err.message}`)).then(() => console.log('Successfull write to JSON!'))
  }

  private jsonReader = async (fileName: string): Promise<TDataArray> => fs.promises.readFile(path.join(process.cwd(), 'data', `mock.data.${fileName}.json`)).then(data => JSON.parse(data.toString()))

  private jsonWriter = async (fileName: string, data: TDataArray): Promise<void> => fs.promises.writeFile(path.join(process.cwd(), 'data', `mock.data.${fileName}.json`), JSON.stringify(data, null, 2))
}
