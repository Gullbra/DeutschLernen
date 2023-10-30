export interface IWordclass {
  class: string,
  translation: string[]
}


export interface INounDeclension {
  nGeneral?: boolean,
  enGeneral?: boolean,
  nsGenitiv?: boolean,
  sesGenetiv?: boolean,
  esGenetivForced?: boolean
}
export interface IClassNoun extends IWordclass {
  article: string,
  plural: string,
  specialDeclensions: INounDeclension
}


export interface IComparativeAndSuperlative {
  stem: string,
  examplePhrases: { phrase: string, translation: string }[]
}
export interface IClassAdverb extends IWordclass, IComparativeAndSuperlative {
  absoluteAdverb: boolean
}
export interface IClassAdjective extends IWordclass, IComparativeAndSuperlative {
  supportNouns: { article: string, noun: string, plural: string, translation: string } []
}


export interface IClassPreposition extends IWordclass {
  forcesCase: string, // [ 'akustativ', 'dativ', 'wechsel', 'genetiv' ]
  commonUses: { example: string, translation: string }[]
}


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
export interface IClassVerb extends IWordclass {
  regular: boolean,
  forcesCase: string, // [ 'Nominativ', 'Akustativ', 'Dativ', 'Genetiv' ] 
  conjugations: IConjugations
}


export interface IWord {
  word: string,
  weight: number,
  modifiedWeight?: number,
  classes: (IClassNoun | IClassVerb | IClassPreposition | IClassAdverb | IClassAdjective)[]
}
export interface IPhrase {}
