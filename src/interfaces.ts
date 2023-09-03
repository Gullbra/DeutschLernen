import type { Interface as rlInterface} from 'node:readline/promises';

export interface IGameState {
  rl: rlInterface,
  wordData: IJsonData,
  workingData: IJsonData,
  workingKeys: string[],
  questionsToAnswer: number,
  workingQuestionNumber: number,
  correctedAnswers: {
    wordOrPhrase: string,
    correctlyAnswered: boolean
  }[]
}

// TODO: New data structure. Old one makes to little sense.
// export interface IGeneralData {
//   wordOrFrase: string
// } 

// export interface INoun extends IGeneralData {
//   noun: {
//     article: string,
//     translation: string []
//   }
// }

// export interface IPhrase extends IGeneralData {
//   phrase: {
//     translation: string
//   }
// }

// export interface IOther extends IGeneralData {
//   verb?: IVerb,
//   adverb?: IAdverbAdjectivePhrase,
//   adjective?: IAdverbAdjectivePhrase,  
// }



export interface IJsonData {
  [key: string]:{
    noun?: INoun,
    verb?: IVerb,
    adverb?: IAdverbAdjectivePhrase,
    adjective?: IAdverbAdjectivePhrase,
    phrase?: IAdverbAdjectivePhrase
  }
}

export interface INewDataStructure {
  wordOrFrase: string,
  noun?: INoun,
  verb?: IVerb,
  adverb?: IAdverbAdjectivePhrase,
  adjective?: IAdverbAdjectivePhrase,
  phrase?: IAdverbAdjectivePhrase
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