interface IConjugation {
  conjugation: string,
  translation: string  
}
interface ITempora {
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
  },
  
}
interface IConjugations {
  ich: ITempora,
  du: ITempora,
  erSieEs: ITempora,
  wir: ITempora,
  ihr: ITempora,
  Sie: ITempora,
}



interface IWordclass {
  class: string
}
interface INoun extends IWordclass {
  article: string,
  plural: string,
  translation: string[]
}
interface IVerb extends IWordclass {
  translation: string[],
  regular: boolean,
  conjugations: IConjugations
}
interface IPreposition extends IWordclass {
  caseType: string //* [ 'Akustativ', 'Dativ', 'Wechsel', 'Genetiv' ] https://www.fluentin3months.com/german-prepositions/?expand_article=1
  translation: string[]
}
interface IAdverbAdjective extends IWordclass {
  translation: string[]
}


interface IWord {
  word: string,
  weight: number,
  classes: (INoun | IVerb | IPreposition | IAdverbAdjective)[]
}
interface IPhrase {
  // ?
}


// * Verbs that decide cases: https://www.fluentin3months.com/german-articles/
// * https://www.germanveryeasy.com/noun-declension