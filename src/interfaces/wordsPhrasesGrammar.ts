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


// export interface IAdjectiveDeclensionOnCase {
//   exercisePhrase: string,
//   translation: string
//   suportNouns: { gender: string, noun: string, translation: string } []
// }
// export interface IAdjectiveDeclensionOnForm {
//   nominativ: IAdjectiveDeclensionOnCase,
//   akusativ: IAdjectiveDeclensionOnCase,
//   dativ: IAdjectiveDeclensionOnCase,
//   genetiv: IAdjectiveDeclensionOnCase,
// }
export interface IClassAdjective extends IWordclass, IComparativeAndSuperlative {
  // hasRegularDeclension: boolean
  // declension?: {
  //   definite: IAdjectiveDeclensionOnForm,
  //   indefinite: IAdjectiveDeclensionOnForm,
  // }
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
  classes: (IClassNoun | IClassVerb | IClassPreposition | IClassAdverb | IClassAdjective)[]
}
export interface IPhrase {}