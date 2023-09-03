

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
  },
}
interface IOneD {
  ich: ITempora,
  du: ITempora,
  erSieEs: ITempora,
  wir: ITempora,
  ihr: ITempora,
  Sie: ITempora,
}

interface IConjugations {
  // ?

  /**
   * 1D: genus
   * 2D: pronomen
   * 3D: tempus
   */

  male: IOneD,
  female: IOneD,
  nuter: IOneD,
  plural: IOneD,

}




interface INoun {
  article: string,
  plural: string,
  translation: string[]
}
interface IVerb {
  translation: string[],
  regular: boolean,
  conjugations: IConjugations
}
interface IPreposition {
  type: string //* [ 'Akustativ', 'Dativ', 'Wechsel', 'Genetiv' ] https://www.fluentin3months.com/german-prepositions/?expand_article=1
  translation: string[]
}
interface IAdverbAdjective {
  translation: string[]
}


interface IWord {
  word: string,
  classes: (INoun | IVerb | IPreposition | IAdverbAdjective)[]
}
interface IPhrase {
  // ?
}


// * Verbs that decide cases: https://www.fluentin3months.com/german-articles/
// * https://www.germanveryeasy.com/noun-declension