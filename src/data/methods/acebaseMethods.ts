import { IDataStorageMethods, TDataArray } from "../../util/interfaces.ts"

export class AcebaseMethods implements IDataStorageMethods {
  async retrieve (inclusiveFilters?: string[] | undefined): Promise<TDataArray> {
    console.log('Not implemented!')
    return [] as TDataArray
  }
  async save (toBeChanged: TDataArray): Promise<void> {
    console.log('Not implemented!')
  }
}

//import { AceBase } from "../node_modules/acebase/dist/types/index";

// const { AceBase } = require('acebase')

// const db = new AceBase('test_db')

// db.ready(() => console.log('db running?'))


//* From/to index.ts:

// import { AceBase } from 'acebase';

// const db = new AceBase('test_db')

//await db.ready(() => console.log('db running?'))

//console.log('after starting?')

// await db.ref('testing_data').set({
//   name: 'testObject',
//   isTest: true
// })

// console.log('after insert?')

// console.log(
//   (await db.ref('testing_data').get()).val()
// )
// console.log('after retrieve')

// //* https://www.npmjs.com/package/acebase
