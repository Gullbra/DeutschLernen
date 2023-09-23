import { IDegreeOfComparisonObject, IGameState, IWordclass } from "../../util/interfaces.ts";
import { inputProcessor, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";

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
  protected async questionDegreeOfComparision (degreeOfComparision: IDegreeOfComparisonObject): Promise<boolean> {
    const selectedPhrase = randomizeArrayElement(degreeOfComparision.useInPhrase)

    if (typeof selectedPhrase.phrase !== 'string' || typeof selectedPhrase.translation !== 'string')
      throw new Error(`Unvalid degree of comparision dataobject:\n${selectedPhrase}\nfor adjective ${this.word}`)

    const blankedPhrase = selectedPhrase.phrase.replace(degreeOfComparision.word, '_'.repeat(degreeOfComparision.word.length))

    const terminalInput = inputProcessor(await this.gameState.lineReader.question(
      `Using the ${this.dataObject.class} "${this.word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means: "${selectedPhrase.translation}".\nYour answer: `
    ))

    const correctlyAnswered = (terminalInput === degreeOfComparision.word.toLowerCase() || terminalInput === selectedPhrase.phrase.toLowerCase())

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
    return correctlyAnswered
  }
}
