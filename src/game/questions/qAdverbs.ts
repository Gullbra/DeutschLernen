import { IClassAdverb, IGameState } from "../../util/interfaces.ts";
import { validationWordClassAdverb } from "../../util/dataValidations.ts";
import { QDegreeOfComparision } from "./parentClasses.ts";

export class QWordClassAdverb extends QDegreeOfComparision {
  protected dataObject: IClassAdverb;

  constructor (gameState: IGameState, word: string, dataObject: IClassAdverb) {
    super(gameState, word, dataObject)
    this.dataObject = dataObject
  }
  
  async getQuestion(): Promise<{ correct: boolean; error: boolean; }> {
    if (!validationWordClassAdverb(this.word, this.dataObject)) {
      console.log(`No or invalid dataObject sent to question for word "${this.word}"`); 
      return { correct: false, error: true }
    }

    if(!this.dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0) {
      try {
        return {
          correct: Math.round(Math.random()) === 0
            ? await this.questionDegreeOfComparision(this.dataObject.comparative)
            : await this.questionDegreeOfComparision(this.dataObject.superlative),
          error: false
        }
      } catch (err) {
        console.log(`Error at ${this.word}: ` + (err as {message: string}).message)
        return { correct: false, error: true }
      }
    } 
    
    return { correct: await this.questionMeaning(), error: false }
  }
}
