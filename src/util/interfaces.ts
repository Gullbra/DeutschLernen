import type { Interface as rlInterface} from 'node:readline/promises';
import { DataHandler } from '../data/dataHandler.ts';

// * Allmänt
// speach to text: https://yourdailygerman.com/german-cases-chart-intuitive


export interface IWordclass {
  class: string,
  translation: string[]
}

export interface IClassNoun extends IWordclass {
  article: string,
  plural: string,
}

// * Some adverbs: https://www.germanveryeasy.com/german-adverbs
// * https://langster.org/en/blog/german-adverbs-a-guide-for-beginners/
// * https://grammar.collinsdictionary.com/german-easy-learning/what-are-the-irregular-german-comparative-and-superlative-adverbs
// * https://grammar.collinsdictionary.com/german-easy-learning/what-are-superlative-adverbs-in-german
export interface IDegreeOfComparisonObject {
  word: string,
  translation: string,
  useInPhrase: {
    phrase: string,
    translation: string
  } []
}
export interface IComparativeAndSuperlative {
  comparative: IDegreeOfComparisonObject,
  superlative: IDegreeOfComparisonObject,
}

export interface IClassAdverb extends IWordclass, IComparativeAndSuperlative {
  absoluteAdverb: boolean
}

// adverb: gern 
// comparative: lieber
// superlative: am liebsten



// * Some adjectives: https://mydailygerman.com/german-adjectives/
// * "declining" of adjectives https://learn-german-easily.com/the-adjectives
export interface IClassAdjective extends IWordclass, IComparativeAndSuperlative {
  exampleNouns: {
    masculine: {
      singular: string,
      plural: string
    },
    neuter: {
      singular: string,
      plural: string
    },
    femimine: {
      singular: string,
      plural: string
    }
  }
}


// * Preposition mechanic: https://www.fluentin3months.com/german-prepositions/?expand_article=1
// * https://www.deutschplus.net/pages/Praposition_fur
export interface IClassPreposition extends IWordclass {
  forcesCase: string, // [ 'akustativ', 'dativ', 'wechsel', 'genetiv' ]
  commonUses: { example: string, translation: string }[]
}

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
// * Verbs that decide cases: https://www.fluentin3months.com/german-articles/
export interface IClassVerb extends IWordclass {
  regular: boolean,
  forcesCase: string, // [ 'Nominativ', 'Akustativ', 'Dativ', 'Genetiv' ] 
  conjugations: IConjugations
}

export interface IWord {
  word: string,
  weight: number,
  classes: (IClassNoun | IClassVerb | IClassPreposition | IClassAdverb | IClassAdjective)[]
}
export interface IPhrase {}

export type TDataArray = IWord[]
// export type TDataArray = (IWord IPhrase)[]

export interface IGameInput {
  lineReader: rlInterface,
  dataHandler: DataHandler
}
export interface IGameState extends IGameInput{
  fullData: TDataArray,
  currentData: TDataArray,
  questionsToAnswer: number,
  currentQuestionNumber: number,
  currentTotalWeight: number,
  correctedAnswers: {
    dataObject: IWord,
    // dataObject: IWord | IPhrase,
    correctlyAnswered: boolean
  }[],
}

export interface IDataStorageMethods {
  retrieve: (inclusiveFilters?: string[]) => Promise<TDataArray>,
  save: (toBeChanged: TDataArray) => Promise<void>
}

export interface IDataSaveObject {
  data: Map<string, TDataArray>,
  processed: Set<string>
}

export interface IDataHandler {
  getData (inclusiveFilters?: string): Promise<TDataArray>,
  saveData (originalData: TDataArray, toBeChanged: TDataArray): Promise<void>,
  applyInclusiveFilters (inclusiveFilters: string[], data: TDataArray): TDataArray
}