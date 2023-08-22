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