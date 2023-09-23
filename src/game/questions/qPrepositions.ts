import { validationWordClassPreposition } from "../../util/dataValidations.ts";
import { IClassPreposition, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";
import { QParentClass } from "./parentClasses.ts";

export class QWordClassPreposition extends QParentClass {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassPreposition) {
    super(gameState, word, dataObject)
  }
  
  async getQuestion(): Promise<{ correct: boolean; error: boolean; }> {
    if (!validationWordClassPreposition(this.word, this.dataObject)) {
      console.log(`No or invalid ${this.dataObject.class}-dataObject sent to question for word "${this.word}"`); 
      return { correct: false, error: true }
    }

    const correct = await (async () => {
      const randomizeExerciseType = Math.round(Math.random() * 3)
  
      if (randomizeExerciseType === 3) {
        return await this.questionMeaning()
      } else if (randomizeExerciseType === 2) {
        return await this.questionCase()
      } else {
        return await this.questionExerciseCase()
      }
    }) ()
  
    return { correct, error: false }
  }

  private async questionCase () {
    const terminalInput = inputProcessor(await this.gameState.lineReader.question(`What case(Akusativ, Dativ, Wechsel, or Genetiv) will a noun refered to by the ${this.dataObject.class} "${this.word}" have?\nYour answer: `))

    const correctlyAnswered = terminalInput === this.dataObject.forcesCase

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, this.dataObject.forcesCase))
    return correctlyAnswered
  }

  private async questionExerciseCase (): Promise<boolean> {
    const selectedUseCase = randomizeArrayElement(this.dataObject.commonUses)

    const terminalInput = inputProcessor(await this.gameState.lineReader.question(`Using the ${this.dataObject.class} "${this.word}", write "${selectedUseCase.translation}" in german.\nYour answer: `))

    const correctlyAnswered = terminalInput === selectedUseCase.example.toLowerCase()

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, selectedUseCase.example))
    return correctlyAnswered
  }
}
