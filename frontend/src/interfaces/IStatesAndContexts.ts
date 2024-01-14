import { IWord } from "./IWordsPhrasesGrammar";

export interface IStateWordsSaved {
  sessionWordData: IWord[],
  setSessionWordData: React.Dispatch<React.SetStateAction<IWord[]>>
} 

export interface IStateExpandedListItems {
  expandedListItems: Set<string>,
  setExpandedListItems: React.Dispatch<React.SetStateAction<Set<string>>>
} 

export interface IStateWordInEdit {
  wordInEdit: Partial<IWord> | null,
  setWordInEdit: React.Dispatch<React.SetStateAction<Partial<IWord> | null>>
}

export interface IStateAssignedWords {
  assignedWords: Set<string>,
  setAssignedWords: React.Dispatch<React.SetStateAction<Set<string>>>
}

export interface IOutletContext extends IStateWordsSaved, IStateWordInEdit, IStateAssignedWords {}
