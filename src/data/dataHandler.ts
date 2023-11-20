import { TDataArray, IDataStorageMethods, TUserProfile, IRawUserProfile, IQuestionProfile } from '../interfaces/IDataStructures';
import { MapExpanded } from '../util/personalLib/setsAndMaps';
import { AcebaseMethods } from './methods/acebaseMethods';
import { JSONMethods } from './methods/jsonMethods';

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


  private constructUserProfile (rawData: IRawUserProfile): TUserProfile {
    const outerMap: TUserProfile = new MapExpanded()

    for (const [outerKey, outerValue] of Object.entries(rawData)) {
      outerMap.set(
        outerKey, 
        {
          weight: outerValue.weight,
          subQuestions: new MapExpanded(Object.entries(outerValue.subQuestions))
        } 
      ) 
    }

    return outerMap
  }

  private deconstructUserProfile (data: TUserProfile): IRawUserProfile {
    const returnObject = {} as IRawUserProfile

    data.forEach((outerValue, classN) => {
      const innerObj: {[key: string]: number} = {}

      outerValue.subQuestions.forEach((weight, type) => innerObj[type] = weight)

      returnObject[classN] = {
        subQuestions: innerObj,
        weight: outerValue.weight
      }
    })

    return returnObject
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