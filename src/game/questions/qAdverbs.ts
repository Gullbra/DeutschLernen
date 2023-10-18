import { IClassAdverb } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { isValidWordClassAdverb } from "../../util/dataValidations.ts";
import { QDegreeOfComparision } from "./aDegreesOfComparision.ts";
import { randomizeInt } from "../../util/personalLibrary.ts"

export class QWordClassAdverb extends QDegreeOfComparision {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdverb) {
    super(gameState, word, dataObject, isValidWordClassAdverb(word, dataObject))
  }

  protected selectQuestionAnon(): Promise<boolean> {
    if(!this.dataObject.absoluteAdverb && randomizeInt(2) > 0)
      return randomizeInt(1) === 0
        ? this.questionDegreeOfComparision(this.dataObject.comparative)
        : this.questionDegreeOfComparision(this.dataObject.superlative)
    
    return this.questionMeaning()
  }

  protected selectQuestionUser(): { typeOfQuestion: string; correct: Promise<boolean>; } {
    if (this.dataObject.absoluteAdverb) {
      return {
        typeOfQuestion: 'meaning',
        correct: this.questionMeaning()
      }
    }

    const typeOfQuestion = this.getTypeOfQuestionByUserWeight ()

    const correct = (() => {
      switch (typeOfQuestion) {
        case 'meaning': return this.questionMeaning()
        case 'degreesOfComparisionComperativ': return this.questionDegreeOfComparision(this.dataObject.comparative)
        case 'degreesOfComparisionSuperlativ': return this.questionDegreeOfComparision(this.dataObject.superlative)
        default: throw new Error(`invalid userfocus "${typeOfQuestion}" to QWordClassNoun.selectQuestion`)
      }
    })()

    return {
      typeOfQuestion,
      correct
    }
  }
}
