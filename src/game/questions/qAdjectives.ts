import { validationWordClassAdjective } from "../../util/dataValidations.ts";
import { IClassAdjective, IGameState } from "../../util/interfaces.ts";
import { QDegreeOfComparision } from "./parentClasses.ts";


export class QWordClassAdjective extends QDegreeOfComparision {
  protected dataObject: IClassAdjective;

  constructor (gameState: IGameState, word: string, dataObject: IClassAdjective) {
    super(gameState, word, dataObject)
    this.dataObject = dataObject
  }
  
  async getQuestion(): Promise<{ correct: boolean; error: boolean; }> {
    if (!validationWordClassAdjective(this.word, this.dataObject)) {
      console.log(`No or invalid dataObject sent to question for word "${this.word}"`); 
      return { correct: false, error: true }
    }

    // if(!this.dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0) {
    //   try {
    //     return {
    //       correct: Math.round(Math.random()) === 0
    //         ? await this.questionDegreeOfComparision(this.dataObject.comparative)
    //         : await this.questionDegreeOfComparision(this.dataObject.superlative),
    //       error: false
    //     }
    //   } catch (err) {
    //     console.log(`Error at ${this.word}: ` + (err as {message: string}).message)
    //     return { correct: false, error: true }
    //   }
    // } 
    
    return { correct: await this.questionMeaning(), error: false }
  }
}


/*
const dummyFunc = (gameState: IGameState, word: string, dataObject: IClassAdverb) => {
  const TestObject = new QWordClassAdverb (gameState, word, dataObject).getQuestion()
}
*/
