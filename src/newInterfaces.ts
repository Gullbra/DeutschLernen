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
export interface INoun extends IWordclass {
  article: string,
  plural: string,
}
// * Verbs that decide cases: https://www.fluentin3months.com/german-articles/
export interface IVerb extends IWordclass {
  regular: boolean,
  forcesCase: string, // [ 'Nominativ', 'Akustativ', 'Dativ', 'Genetiv' ] 
  conjugations: IConjugations
}
//* Preposition mechanic: https://www.fluentin3months.com/german-prepositions/?expand_article=1
export interface IPreposition extends IWordclass {
  forcesCase: string // [ 'Akustativ', 'Dativ', 'Wechsel', 'Genetiv' ] 
}
export interface IAdverbAdjective extends IWordclass {}


export interface IWord {
  word: string,
  weight: number,
  classes: (INoun | IVerb | IPreposition | IAdverbAdjective)[]
}
// TODO: export interface IPhrase {}