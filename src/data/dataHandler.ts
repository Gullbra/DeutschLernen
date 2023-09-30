import { TDataArray, IDataStorageMethods } from '../util/interfaces.ts';
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
    return this.dataStorageMethods.retrieve(inclusiveFilters)
      .then(data => (
        inclusiveFilters && inclusiveFilters.length > 0
          ? this.applyInclusiveFilters(inclusiveFilters, data)
          : data
      ))
      .catch(err => { console.log(`Error in data retrieval: ${err.message}. No data retrieved.`); return [] })    
  }

  async saveGameData (toBeChanged: TDataArray) {
    return this.dataStorageMethods.update(toBeChanged).catch(err => console.log(`Error when updating data: ${err.message}. No data updated.`))
  }

  async insertNewData (newData: TDataArray) {
    return this.dataStorageMethods.insert(newData).catch(err => console.log(`Error in data insertion: ${err.message}. No data inserted.`))
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