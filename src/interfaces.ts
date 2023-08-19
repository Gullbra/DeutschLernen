export interface IJsonData {
  [key: string]: IVerbAdverbAdjective | INoun
}

interface IVerbAdverbAdjective {
  translation: string[]
}

interface INoun {
  article: string,
  translation: string[]
}
