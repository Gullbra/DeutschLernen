import { IClassAdverb, IGameState } from "../../util/interfaces.ts";
import { isValidWordClassAdverb } from "../../util/dataValidations.ts";
import { QDegreeOfComparision } from "./parentClasses.ts";

export class QWordClassAdverb extends QDegreeOfComparision {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdverb) {
    super(gameState, word, dataObject, isValidWordClassAdverb(word, dataObject))
  }
  protected selectQuestion(): Promise<boolean> {
    if(!this.dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0)
      return Math.round(Math.random()) === 0
        ? this.questionDegreeOfComparision(this.dataObject.comparative)
        : this.questionDegreeOfComparision(this.dataObject.superlative)
    
    return this.questionMeaning()
  }
}
