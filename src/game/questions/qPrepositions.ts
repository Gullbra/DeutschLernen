import { isValidWordClassPreposition } from "../../util/dataValidations";
import { IGameState } from "../../interfaces/IDataStructures";
import { IClassPreposition } from "../../interfaces/IWordsPhrasesGrammar";
import { comparerß, inputProcessor, qResultSimpleUI } from "../../util/util";
import { randomizeArrayElement } from "../../util/personalLib/pseudoRandomizing"
import { QParentClass } from "./aParentClass";

export class QWordClassPreposition extends QParentClass {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassPreposition) {
    super(gameState, word, dataObject, isValidWordClassPreposition(word, dataObject))
  }

  protected selectQuestionAnon(): Promise<boolean> {
    return (() => {
      const randomizeExerciseType = Math.round(Math.random() * 3)
  
      if (randomizeExerciseType === 3) {
        return this.questionMeaning()
      } else if (randomizeExerciseType === 2) {
        return this.questionCase()
      } else {
        return this.questionExerciseCase()
      }
    }) ()
  }
  protected selectQuestionUser(): { typeOfQuestion: string; correct: Promise<boolean>; } {
    throw new Error("Method not implemented.");
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

    const correctlyAnswered = comparerß(terminalInput, selectedUseCase.example.toLowerCase())

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, selectedUseCase.example))
    return correctlyAnswered
  }
}
