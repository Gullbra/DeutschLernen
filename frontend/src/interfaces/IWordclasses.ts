export interface INounDataObject {
  word: string;
  weight: number;
  classes: {
      class: string;
      article: string;
      plural: string;
      specialDeclensions: {};
      translation: string[];
  }[];
}[]