import { IDegreeOfComparisonObject, IGameState, IWordclass } from "../../util/interfaces.ts";
import { comparerß, inputProcessor, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";

export abstract class QParentClass {
  constructor (protected gameState: IGameState, protected word: string, protected dataObject: IWordclass, protected dataIsValid: boolean) {}

  async getQnA(): Promise<{correct: boolean, error: boolean}> {
    if (!this.dataIsValid) {
      console.log(`No or invalid ${this.dataObject.class}-dataObject sent to question for word "${this.word}"`); 
      return { error: true, correct: false}
    }

    return { 
      correct: await this.selectQuestion(), 
      error: false 
    }
  }

  protected abstract selectQuestion (): Promise<boolean>

  protected async questionMeaning (): Promise<boolean> {
    const terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.word}" mean"?\nYour answer: `));

    const correctlyAnswered = this.dataObject.translation.some(el => comparerß(terminalInput, el))
  
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

    const correctlyAnswered = (comparerß(terminalInput, degreeOfComparision.word.toLowerCase()) || comparerß(terminalInput, selectedPhrase.phrase.toLowerCase()))

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
    return correctlyAnswered
  }
}
