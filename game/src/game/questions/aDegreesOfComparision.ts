import { QParentClass } from "./aParentClass.ts"

export abstract class QDegreeOfComparision extends QParentClass {
  protected abstract questionDegreeOfComparision(degreeOfComparision: string): Promise<boolean>
}
