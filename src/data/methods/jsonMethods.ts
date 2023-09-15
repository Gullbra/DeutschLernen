import fs from 'fs'
import path from "path";
import { IDataStorageMethods, IWord, TDataArray } from "../../util/interfaces.ts"

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
    const toSaveObject = this.dataSpliting(toBeChangedArr)

    const filesToStoreIn = new Set<string>()
    if (toSaveObject.nouns.length > 0)
      filesToStoreIn.add('nouns')
    if (toSaveObject.prepositions.length > 0)
      filesToStoreIn.add('prepositions')
    if (toSaveObject.others.length > 0)
      filesToStoreIn.add('others')

    originalDataArr.forEach(dataObj => {
      if(toSaveObject.processed.has(dataObj.word))
        return

      if (dataObj.classes.find(classObj => classObj.class === 'noun')) {
        if (filesToStoreIn.has('nouns'))
          return toSaveObject.nouns.push(dataObj)
        return
      }
      
      if (dataObj.classes.find(classObj => classObj.class === 'preposition')) {
        if (filesToStoreIn.has('prepositions'))
          return toSaveObject.prepositions.push(dataObj)
        return
      }

      if (filesToStoreIn.has('others'))
        return toSaveObject.others.push(dataObj)
      return      
    })

    const promiseArray = []
    if (filesToStoreIn.has('nouns'))
      promiseArray.push(this.jsonWriter('nouns', toSaveObject.nouns))
    if (filesToStoreIn.has('prepositions'))
      promiseArray.push(this.jsonWriter('prepositions', toSaveObject.prepositions))
    if (filesToStoreIn.has('others'))
      promiseArray.push(this.jsonWriter('others', toSaveObject.others))

    await Promise.all(promiseArray).catch(err => console.log(`Error in write to JSON: ${err.message}`)).then(() => console.log('Successfull write to JSON!'))
  }

  private dataSpliting (dataArr: TDataArray): {nouns: IWord[], prepositions: IWord[], others: IWord[], processed: Set<string>} {
    const returnObj: {nouns: IWord[], prepositions: IWord[], others: IWord[], processed: Set<string>} = {
      processed: new Set<string> (),
      nouns: [],
      prepositions: [],
      others: []
    }

    dataArr.forEach (dataObj => {
      if (dataObj.classes.find(classObj => classObj.class === 'noun'))
        return returnObj.nouns.push(dataObj)

      if (dataObj.classes.find(classObj => classObj.class === 'preposition'))
        return returnObj.prepositions.push(dataObj)

      returnObj.processed.add(dataObj.word)
      return returnObj.others.push(dataObj)
    })

    return returnObj
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