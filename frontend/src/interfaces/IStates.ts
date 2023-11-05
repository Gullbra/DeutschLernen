import { INounDataObject } from "./IWordclasses";

export interface IStateToBeInserted {
  toBeInserted: INounDataObject[],
  setToBeInserted: React.Dispatch<React.SetStateAction<INounDataObject[]>>
} 

export interface IStateExpanded {
  expanded: Set<string>,
  setExpanded: React.Dispatch<React.SetStateAction<Set<string>>>
} 