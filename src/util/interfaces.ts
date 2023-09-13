import type { Interface as rlInterface} from 'node:readline/promises';

// * Verb conjugations: https://verben.org/sv/konjugering/geben
export interface IConjugation {
  conjugation: string,
  translation: string  
}
export interface ITempora {
  present: {
    presens: IConjugation,        
  },
  past: {
    perfekt: IConjugation,
    imperfekt: IConjugation,
    pluskvamperfekt: IConjugation,
  },
  future: {
    futur1: IConjugation,
    futur2: IConjugation,
    imperativ: IConjugation
    // TODO: understand and then complete the complex tepus (tempora) in german
  }
}
export interface IConjugations {
  ich: ITempora,
  du: ITempora,
  erSieEs: ITempora,
  wir: ITempora,
  ihr: ITempora,
  Sie: ITempora,
}

export interface IWordclass {
  class: string,
  translation: string[]
}
// * Noun endings: https://www.germanveryeasy.com/noun-declension
export interface IClassNoun extends IWordclass {
  article: string,
  plural: string,
}
// * Verbs that decide cases: https://www.fluentin3months.com/german-articles/
export interface IClassVerb extends IWordclass {
  regular: boolean,
  forcesCase: string, // [ 'Nominativ', 'Akustativ', 'Dativ', 'Genetiv' ] 
  conjugations: IConjugations
}
// * Preposition mechanic: https://www.fluentin3months.com/german-prepositions/?expand_article=1
export interface IClassPreposition extends IWordclass {
  forcesCase: string, // [ 'akustativ', 'dativ', 'wechsel', 'genetiv' ]
  commonUses: { example: string, translation: string }[]
}
// * Some adjectives: https://mydailygerman.com/german-adjectives/
// * "declining" of adjectives https://learn-german-easily.com/the-adjectives
// * Some adverbs: https://www.germanveryeasy.com/german-adverbs
export interface IClassAdverbAdjective extends IWordclass {}


export interface IWord {
  word: string,
  weight: number,
  classes: (IClassNoun | IClassVerb | IClassPreposition | IClassAdverbAdjective)[]
}
// TODO: export interface IPhrase {}

export type TDataArray = IWord[]

export interface IGameInput {
  lineReader: rlInterface,
  fullData: TDataArray,
}
export interface IGameState extends IGameInput{
  currentData: TDataArray,
  questionsToAnswer: number,
  currentQuestionNumber: number,
  correctedAnswers: {
    dataObject: IWord,
    correctlyAnswered: boolean
  }[],
}