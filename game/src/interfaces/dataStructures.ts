import type { Interface as rlInterface} from 'node:readline/promises';
import { DataHandler } from '../data/dataHandler.ts';
import { IWord, IPhrase } from './wordsPhrasesGrammar.ts';
import { MapExpanded } from '../util/personalLibrary.ts';


export type TDataArray = IWord[] // (IWord | IPhrase)[]


export interface IRawUserProfile {
  [key: string]: {
    weight: number,
    subQuestions: {[key: string]: number}
  }
}
export interface IQuestionProfile {
  weight: number,
  subQuestions: MapExpanded<string, number>
}
export type TUserProfile = MapExpanded<string, IQuestionProfile>


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
export interface ITypeOfQuestion {
  mainType: string,
  subQType: string
}
export interface IQuestionReturnObject {
  correct?: boolean, 
  error?: boolean, 
  wClass?: string, 
  typeOfQuestion?: string
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