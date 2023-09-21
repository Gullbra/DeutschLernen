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

  async getData (inclusiveFilters?: string[]): Promise<TDataArray> {
    return inclusiveFilters && inclusiveFilters.length > 0
      ? this.applyInclusiveFilters(inclusiveFilters, await this.dataStorageMethods.retrieve(inclusiveFilters))
      : this.dataStorageMethods.retrieve()
  }

  async saveData (toBeChanged: TDataArray) {
    return this.dataStorageMethods.save(toBeChanged)
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