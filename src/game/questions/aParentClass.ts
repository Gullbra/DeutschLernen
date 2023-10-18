import { IWordclass } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { comparerß, inputProcessor, qResultMeaningUI } from "../../util/util.ts";
import { randomizeInt } from "../../util/personalLibrary.ts"

export abstract class QParentClass {
  constructor (protected gameState: IGameState, protected word: string, protected dataObject: IWordclass, protected dataIsValid: boolean) {}

  async getQnA () {
    return !!this.gameState.userProfile ? this.getQnAUser() : this.getQnAAnon()
  }

  protected async getQnAAnon(): Promise<{correct: boolean, error: boolean}> {
    if (!this.dataIsValid) {
      console.log(`No or invalid ${this.dataObject.class}-dataObject sent to question for word "${this.word}"`); 
      return { error: true, correct: false}
    }

    return { 
      correct: await this.selectQuestionAnon(), 
      error: false 
    }
  }

  protected async getQnAUser(): Promise<{correct: boolean, error: boolean, typeOfQuestion: string, wClass: string}> {
    if (!this.dataIsValid) {
      console.log(`No or invalid ${this.dataObject.class}-dataObject sent to question for word "${this.word}"`); 
      return { error: true, correct: false, typeOfQuestion: '', wClass: this.dataObject.class }
    }

    const { correct, typeOfQuestion } = this.selectQuestionUser()
    return {
      wClass: this.dataObject.class,
      correct: await correct,
      typeOfQuestion,
      error: false 
    }
  }

  protected abstract selectQuestionUser (): {typeOfQuestion: string, correct: Promise<boolean>}
  protected abstract selectQuestionAnon (): Promise<boolean>

  protected getTypeOfQuestionByUserWeight (inputQuestionTypes?: string[], inputQuestionWeights?: number[]): string {
    const [ questionTypes, questionWeights ] = (!!inputQuestionTypes && !!inputQuestionWeights)
      ? [inputQuestionTypes, inputQuestionWeights]
      : [ 
          Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.keys() as IterableIterator<string>), 
          Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.values() as IterableIterator<number>)
        ]

    const randomInt = randomizeInt(questionWeights.reduce((sum, curr) => sum + curr, 0))

    for (let i = 0, sum = 0; i < questionWeights.length-1; i++) {
      sum += questionWeights[i]
      if (sum >= randomInt) {
        return questionTypes[i]
      }
    }
    return questionTypes[questionTypes.length-1]
  }

  protected async questionMeaning (): Promise<boolean> {
    const terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.word}" mean"?\nYour answer: `));

    const correctlyAnswered = this.dataObject.translation.some(el => comparerß(terminalInput, el))
  
    await this.gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, this.dataObject.translation))
    return correctlyAnswered
  } 
}
