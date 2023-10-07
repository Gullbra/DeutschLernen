import { IClassAdverb } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { isValidWordClassAdverb } from "../../util/dataValidations.ts";
import { QDegreeOfComparision } from "./aDegreesOfComparision.ts";

export class QWordClassAdverb extends QDegreeOfComparision {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdverb) {
    super(gameState, word, dataObject, isValidWordClassAdverb(word, dataObject))
  }

  protected selectQuestionAnon(): Promise<boolean> {
    if(!this.dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0)
      return Math.round(Math.random()) === 0
        ? this.questionDegreeOfComparision(this.dataObject.comparative)
        : this.questionDegreeOfComparision(this.dataObject.superlative)
    
    return this.questionMeaning()
  }

  protected selectQuestionUser(): { typeOfQuestion: string; correct: Promise<boolean>; } {
    throw new Error("Method not implemented.");
  }
}
