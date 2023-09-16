import fs from 'fs'
import path from "path";
import { IDataStorageMethods, IDataSaveObject, TDataArray } from "../../util/interfaces.ts"

export class JSONMethods implements IDataStorageMethods {
  async retrieve (inclusiveFilters?: string[]): Promise<TDataArray> {
    let filesToRetriveFrom: string[] = []

    if (inclusiveFilters) {
      filesToRetriveFrom = this.filterValidation(inclusiveFilters)
    }

    if (filesToRetriveFrom.length === 0) {
      filesToRetriveFrom = [ 'nouns', 'prepositions', 'others' ]
    }

    return (await Promise.all(filesToRetriveFrom.map(name => this.jsonReader(name)))).flat()    
  }

  async save (originalDataArr: TDataArray, toBeChangedArr: TDataArray): Promise<void> {
    let toSaveObject = {
      processed: new Set(), 
      nouns: [],
      prepositions: [],
      others: []
    } as IDataSaveObject

    toSaveObject = this.dataSpliting(toSaveObject, toBeChangedArr)

    if (toSaveObject.nouns?.length === 0)
      delete toSaveObject.nouns
    if (toSaveObject.prepositions?.length === 0)
      delete toSaveObject.prepositions
    if (toSaveObject.others?.length === 0)
      delete toSaveObject.others

    toSaveObject = this.dataSpliting(toSaveObject, originalDataArr)

    delete toSaveObject.processed

    await Promise.all(Object.entries(toSaveObject).map(arr => this.jsonWriter(arr[0], arr[1])))
      .catch(err => console.log(`Error in write to JSON: ${err.message}`))
      .then(() => console.log('Successfull write to JSON!'))
  }

  private dataSpliting (toSaveObject: IDataSaveObject, dataArr: TDataArray): IDataSaveObject {
    dataArr.forEach (dataObj => {
      if(toSaveObject.processed) {
        if(toSaveObject.processed.has(dataObj.word))
          return
  
        toSaveObject.processed.add(dataObj.word)
      }

      if (toSaveObject.nouns && dataObj.classes.find(classObj => classObj.class === 'noun'))
        return toSaveObject.nouns.push(dataObj)

      if (toSaveObject.prepositions && dataObj.classes.find(classObj => classObj.class === 'preposition'))
        return toSaveObject.prepositions.push(dataObj)

      if (toSaveObject.others)
        return toSaveObject.others.push(dataObj)
      return
    })

    return toSaveObject
  }

  private filterValidation (inclusiveFilters: string[]): string[] {
    const returnArr: string[] = []

    if (inclusiveFilters.includes('noun'))
      returnArr.push('nouns')

    if (inclusiveFilters.includes('preposition'))
      returnArr.push('prepositions')

    if (inclusiveFilters.includes('adverb') || inclusiveFilters.includes('adjective'))
      returnArr.push('others')

    return returnArr
  }

  private jsonReader = async (fileName: string): Promise<TDataArray> => fs.promises.readFile(path.join(process.cwd(), 'data', `mock.data.${fileName}.json`)).then(data => JSON.parse(data.toString()))

  private jsonWriter = async (fileName: string, data: TDataArray): Promise<void> => fs.promises.writeFile(path.join(process.cwd(), 'data', `mock.data.${fileName}.json`), JSON.stringify(data, null, 2))
}