import type { Interface as rlInterface} from 'node:readline/promises';
import { DataHandler } from '../data/dataHandler.ts';
import { IWord, IPhrase } from './wordsPhrasesGrammar.ts';

export type TDataArray = IWord[] // (IWord | IPhrase)[]

export interface IRawUserProfile {[key: string]: {[key: string]: number}}
export type TUserProfile = Map<string, Map<string, number>>


export interface IGameState {
  lineReader: rlInterface,
  dataHandler: DataHandler,
  fullData: TDataArray,
  currentData: TDataArray,
  userProfile?: TUserProfile,
  questionsToAnswer: number,
  currentQuestionNumber: number,
  currentTotalWeight: number,
  correctedAnswers: {
    dataObject: IWord, // IWord | IPhrase,
    correct: boolean
  }[],
}


export interface IDataStorageMethods {
  retrieveData (inclusiveFilters?: string[]): Promise<TDataArray>,
  updateData (toBeChanged: TDataArray): Promise<void>,
  insertData (newData: TDataArray): Promise<void>,

  retrieveUser (): Promise<IRawUserProfile>,
  updateUser (updatedUser: IRawUserProfile): Promise<void>
}
export interface IDataSaveObject {
  data: Map<string, TDataArray>,
  processed: Set<string>
}
export interface IDataHandler {
  getGameData (inclusiveFilters?: string): Promise<TDataArray>,
  saveGameData (originalData: TDataArray, toBeChanged: TDataArray): Promise<void>,
  applyInclusiveFilters (inclusiveFilters: string[], data: TDataArray): TDataArray
}