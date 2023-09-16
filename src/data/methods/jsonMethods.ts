import fs from 'fs'
import path from "path";
import { IDataStorageMethods, IDataSaveObject, TDataArray } from "../../util/interfaces.ts"

export class JSONMethods implements IDataStorageMethods {
  private hardCodedValues = {
    seperateFileClasses: [
      'noun',
      'preposition',
      'other'
    ],
    classesInOtherFile: [
      'adjective',
      'adverb'
    ]
  }

  async retrieve (inclusiveFilters?: string[]): Promise<TDataArray> {
    let filesToRetriveFrom: string[] = []

    if (inclusiveFilters) {
      filesToRetriveFrom = this.filterValidation(inclusiveFilters)
    }

    if (filesToRetriveFrom.length === 0) {
      filesToRetriveFrom = this.hardCodedValues.seperateFileClasses.map(className => className)
    }

    return (await Promise.all(filesToRetriveFrom.map(name => this.jsonReader(name)))).flat()    
  }

  async save (originalDataArr: TDataArray, toBeChangedArr: TDataArray): Promise<void> {
    let toSaveObject = {
      processed: new Set(),
      data: new Map(this.hardCodedValues.seperateFileClasses.map(className => [ className, [] ]))
    } as IDataSaveObject
    
    toSaveObject = this.dataSpliting(toSaveObject, toBeChangedArr)

    this.hardCodedValues.seperateFileClasses.forEach(className =>{
      if (toSaveObject.data.get(className)?.length === 0) 
        toSaveObject.data.delete(className)
    })

    toSaveObject = this.dataSpliting(toSaveObject, originalDataArr)

    await Promise.all(Array.from(toSaveObject.data).map(arr => this.jsonWriter(arr[0], arr[1])))
      .catch(err => console.log(`Error in write to JSON: ${err.message}`))
      .then(() => console.log('Successfull write to JSON!'))
  }

  private dataSpliting (toSaveObject: IDataSaveObject, dataArr: TDataArray): IDataSaveObject {
    dataArr.forEach (dataObj => {
      if(toSaveObject.processed.has(dataObj.word)) 
        return

      toSaveObject.processed.add(dataObj.word)
      
      toSaveObject.data.forEach((classDataArr, className) => {
        if (
          dataObj.classes.find(classObj => classObj.class === className) ||
          (className === 'other' && dataObj.classes.some(classObj => this.hardCodedValues.classesInOtherFile.includes(classObj.class)))
        ) {
          return classDataArr.push(dataObj)          
        }
      })

      return
    })

    return toSaveObject
  }

  private filterValidation (inclusiveFilters: string[]): string[] {
    const returnArr: string[] = []

    this.hardCodedValues.seperateFileClasses.forEach(className => {
      if (inclusiveFilters.includes(className))
      returnArr.push(className)
    })

    if (this.hardCodedValues.classesInOtherFile.some(className => inclusiveFilters.includes(className)))
      returnArr.push('other')

    return returnArr
  }

  private jsonReader = async (fileName: string): Promise<TDataArray> => fs.promises.readFile(path.join(process.cwd(), 'data', `data.${fileName}.json`)).then(data => JSON.parse(data.toString()))

  private jsonWriter = async (fileName: string, data: TDataArray): Promise<void> => fs.promises.writeFile(path.join(process.cwd(), 'data', `data.${fileName}.json`), JSON.stringify(data, null, 2))
}