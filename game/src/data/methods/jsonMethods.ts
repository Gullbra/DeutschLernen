import fs from 'fs'
import path from "path";
import { IDataStorageMethods, IDataSaveObject, TDataArray, IRawUserProfile } from "../../interfaces/dataStructures.ts"
import { IClassNoun, IClassPreposition, IClassAdverb, IClassAdjective, IWord } from "../../interfaces/wordsPhrasesGrammar.ts"
import { isValidWordClassAdjective, isValidWordClassAdverb, isValidWordClassNoun, isValidWordClassPreposition } from '../../util/dataValidations.ts';

// export interface IDataInsertObject {
//   data: Map<string, TDataArray>,
//   processed: Map<string, number>
// }

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

  async retrieveData (inclusiveFilters?: string[]): Promise<TDataArray> {
    let filesToRetriveFrom: string[] = []

    if (inclusiveFilters && Array.isArray(inclusiveFilters) && inclusiveFilters.length > 0) {
      filesToRetriveFrom = this.filterValidation(inclusiveFilters)
    }

    if (filesToRetriveFrom.length === 0) {
      filesToRetriveFrom = this.hardCodedValues.seperateFileClasses.map(className => className)
    }

    return (await Promise.all(filesToRetriveFrom.map(name => this.jsonReader(name)))).flat() as TDataArray    
  }

  async insertData (newData: TDataArray): Promise<void> {
    let toSaveObject: IDataSaveObject = {
      processed: new Set(),
      data: new Map(this.hardCodedValues.seperateFileClasses.map(className => [ className, [] ]))
    }
    
    toSaveObject = this.dataSpliting(toSaveObject, newData, this.validateInsertion)
    const toRetrievePromises: Promise<TDataArray>[] = []

    this.hardCodedValues.seperateFileClasses.forEach((className) => {
      if (toSaveObject.data.get(className)?.length === 0) 
        return toSaveObject.data.delete(className)
      return toRetrievePromises.push(this.jsonReader(className) as Promise<TDataArray>)
    })
    
    toSaveObject = this.dataSpliting(toSaveObject, ((await Promise.all(toRetrievePromises)).flat()), (dataObj: IWord) => {
      if(toSaveObject.processed.has(dataObj.word))
        throw Error(`Already existing dataobject for "${dataObj.word}" existing in database."`)
    })

    await Promise.all(Array.from(toSaveObject.data).map(arr => this.jsonWriter(arr[0], arr[1])))
      .catch(err => console.log(`Error in write to JSON: ${err.message}`))
      .then(() => console.log('Successfull write to JSON!'))
  }

  async updateData (toBeChangedArr: TDataArray): Promise<void> {
    let toSaveObject = {
      processed: new Set(),
      data: new Map(this.hardCodedValues.seperateFileClasses.map(className => [ className, [] ]))
    } as IDataSaveObject
    
    toSaveObject = this.dataSpliting(toSaveObject, toBeChangedArr)
    const toRetrievePromises: Promise<TDataArray>[] = []

    this.hardCodedValues.seperateFileClasses.forEach((className) => {
      if (toSaveObject.data.get(className)?.length === 0) 
        return toSaveObject.data.delete(className)
      return toRetrievePromises.push(this.jsonReader(className) as Promise<TDataArray>)
    })

    toSaveObject = this.dataSpliting(toSaveObject, ((await Promise.all(toRetrievePromises)).flat()))

    await Promise.all(Array.from(toSaveObject.data).map(arr => this.jsonWriter(arr[0], arr[1])))
      .catch(err => console.log(`Error in write to JSON: ${err.message}`))
      .then(() => console.log('Successfull write to JSON!'))
  }

  private dataSpliting (toSaveObject: IDataSaveObject, dataArr: TDataArray, extraFunc?: (test: IWord) => void): IDataSaveObject {
    dataArr.forEach (dataObj => {
      if(extraFunc) 
        extraFunc(dataObj)

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

  private validateInsertion (dataObj: IWord) {
    if (dataObj.weight !== 100) 
      throw Error(`Invalid starting weight for for entry "${dataObj.word}"`)

    dataObj.classes.forEach(classObj => {
      switch (classObj.class) {
        case 'noun':
          if (!isValidWordClassNoun(dataObj.word, classObj as IClassNoun))
            throw Error(`Invalid object for entry "${dataObj.word}"`)
          break     
        case 'preposition':
          if (!isValidWordClassPreposition(dataObj.word, classObj as IClassPreposition))
            throw Error(`Invalid object for entry "${dataObj.word}"`)
          break
        case 'adverb':
          if (!isValidWordClassAdverb(dataObj.word, classObj as IClassAdverb))
            throw Error(`Invalid object for entry "${dataObj.word}"`)
          break
        case 'adjective':
          if (!isValidWordClassAdjective(dataObj.word, classObj as IClassAdjective))
            throw Error(`Invalid object for entry "${dataObj.word}"`)
          break
      
        default:
          throw Error(`Invalid class "${classObj.class}" for entry "${dataObj.word}"`)
      }
    })
  }

  async retrieveUser(): Promise<IRawUserProfile> {
    return this.jsonReader("userprofile") as Promise<IRawUserProfile>
  }
  async updateUser(updatedUser: IRawUserProfile): Promise<void> {
    return this.jsonWriter("userprofile", updatedUser)
  }

  private jsonReader = async (fileName: string): Promise<(TDataArray | IRawUserProfile)> => fs.promises.readFile(path.join(process.cwd(), 'data', `data.${fileName}.json`)).then(data => JSON.parse(data.toString()))

  private jsonWriter = async (fileName: string, data: (TDataArray | IRawUserProfile)): Promise<void> => fs.promises.writeFile(path.join(process.cwd(), 'data', `data.${fileName}.json`), JSON.stringify(data, null, 2))
}
