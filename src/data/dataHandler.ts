import { TDataArray, IDataStorageMethods, TUserProfile, IRawUserProfile } from '../util/interfaces.ts';
import { AcebaseMethods } from './methods/acebaseMethods.ts';
import { JSONMethods } from './methods/jsonMethods.ts';

export class DataHandler {
  private dataStorageMethods: IDataStorageMethods

  constructor (dataBase?: boolean) {
    this.dataStorageMethods = dataBase
      ? new AcebaseMethods()
      : new JSONMethods()
  }

  async getGameData (inclusiveFilters?: string[]): Promise<TDataArray> {
    return this.dataStorageMethods.retrieveData(inclusiveFilters)
      .then(data => (
        inclusiveFilters && inclusiveFilters.length > 0
          ? this.applyInclusiveFilters(inclusiveFilters, data)
          : data
      ))
      .catch(err => { console.log(`Error in data retrieval: ${err.message}. No data retrieved.`); return [] })    
  }
  async saveGameData (toBeChanged: TDataArray, userprofile?: TUserProfile) {
    return this.dataStorageMethods.updateData(toBeChanged).catch(err => console.log(`Error when updating data: ${err.message}. No data updated.`))
  }
  async insertNewData (newData: TDataArray) {
    return this.dataStorageMethods.insertData(newData).catch(err => console.log(`Error in data insertion: ${err.message}. No data inserted.`))
  }


  async getUserProfile (): Promise<TUserProfile> {return this.dataStorageMethods.retrieveUser().then(data => this.constructUserProfile(data))}
  async saveUserProfile (data: TUserProfile) {return this.dataStorageMethods.updateUser(this.deconstructUserProfile(data))}

  
  private deconstructUserProfile (data: TUserProfile): IRawUserProfile {
    const returnObject = {} as IRawUserProfile

    data.forEach((innerMap, classN) => {
      const innerObj: {[key: string]: number} = {}
      innerMap.forEach((weight, type) => {
        innerObj[type] = weight
      })
      returnObject[classN] = innerObj
    })

    return returnObject
  }

  private constructUserProfile (rawData: IRawUserProfile): TUserProfile {
    const outerMap: TUserProfile = new Map()

    for (const [outerKey, outerValue] of Object.entries(rawData)) {
      const innerMap = new Map<string, number>()
      for (const [innerKey, innerValue] of Object.entries(outerValue))
        innerMap.set(innerKey, innerValue)
          
      outerMap.set(outerKey, innerMap) 
    }
    return outerMap
  }

  applyInclusiveFilters (inclusiveFilters: string[], data: TDataArray): TDataArray {
    return data.reduce((prev, current) => { 
      const currentClasses = current.classes.filter(classObj => inclusiveFilters.includes(classObj.class))

      return currentClasses.length > 0
        ? [...prev, {...current, classes: currentClasses}]
        : prev
    }, [] as TDataArray)
  }
}