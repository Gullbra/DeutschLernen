import { isValidWordClassAdjective } from "../../util/dataValidations.ts";
import { IClassAdjective, IGameState } from "../../util/interfaces.ts";
import { QDegreeOfComparision } from "./parentClasses.ts";


export class QWordClassAdjective extends QDegreeOfComparision {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdjective) {
    super(gameState, word, dataObject, isValidWordClassAdjective(word, dataObject))
  }
  
  selectQuestion(): Promise<boolean> {

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
    
    return this.questionMeaning()
  }

  
}


/*
const dummyFunc = (gameState: IGameState, word: string, dataObject: IClassAdverb) => {
  const TestObject = new QWordClassAdverb (gameState, word, dataObject).getQnA()
}
*/
