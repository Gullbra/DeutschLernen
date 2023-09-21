import { IGameState, IWordclass } from "../../util/interfaces.ts";
import { inputProcessor, qResultMeaningUI } from "../../util/util.ts";

export abstract class QParentClass {
  protected gameState: IGameState
  protected word: string
  protected dataObject: IWordclass

  constructor (gameState: IGameState, word: string, dataObject: IWordclass) {this.gameState = gameState; this.word = word; this.dataObject = dataObject;}

  abstract getQuestion(): Promise<{correct: boolean, error: boolean}>

  protected async questionMeaning (): Promise<boolean> {
    const terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.word}" mean"?\nYour answer: `));

    const correctlyAnswered = this.dataObject.translation.some(el => el === terminalInput)
  
    await this.gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, this.dataObject.translation))
    return correctlyAnswered
  } 
}

export abstract class QDegreeOfComparision extends QParentClass {

}