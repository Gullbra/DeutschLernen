import type { Interface as rlInterface} from 'node:readline/promises';

export interface IGameState {
  rl: rlInterface,
  wordData: IJsonData,
  workingData: IJsonData,
  workingKeys: string[],
  questionsToAnswer: number,
  workingQuestionNumber: number,
  correctedAnswers: {[key: string]: boolean}[]
}

export interface IJsonData {
  [key: string]:{
    noun?: INoun,
    verb?: IVerb,
    adverb?: IAdverbAdjectivePhrase,
    adjective?: IAdverbAdjectivePhrase,
    phrase?: IAdverbAdjectivePhrase
  }
}

export interface IAdverbAdjectivePhrase {
  translation: string[]
}

export interface INoun {
  article: string,
  translation: string[]
}

export interface IVerb {
  translation: string[]
}