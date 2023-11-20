import { QParentClass } from "./aParentClass"

export abstract class QDegreeOfComparision extends QParentClass {
  protected abstract questionDegreeOfComparision(degreeOfComparision: string): Promise<boolean>
}
