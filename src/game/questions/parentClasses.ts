import { IDegreeOfComparisonObject, IGameState, IWordclass } from "../../util/interfaces.ts";
import { comparerß, inputProcessor, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement, randomizeInt } from "../../util/util.ts";

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

  async newGetQnA(): Promise<{correct: boolean, error: boolean, typeOfQuestion: string}> {
    if (!this.dataIsValid) {
      console.log(`No or invalid ${this.dataObject.class}-dataObject sent to question for word "${this.word}"`); 
      return { error: true, correct: false, typeOfQuestion: ''}
    }

    const { correct, typeOfQuestion } = this.newSelectQuestion()
    return {
      correct: await correct,
      typeOfQuestion,
      error: false 
    }
  }

  protected selectTypeOfQuestion () {
    const [ focusKey, focusWeights ] = [ 
      Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.keys() as IterableIterator<string>), 
      Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.values() as IterableIterator<number>)
    ]

    return (() => {
      const randomInt = randomizeInt(focusWeights.reduce((sum, curr) => sum + curr), 0)

      for (let i = 0, sum = 0; i < focusWeights.length-2; i++) {
        sum += focusWeights[i]
        if (sum <= randomInt) {
          return focusKey[i]
        }
      }
      return focusKey[focusKey.length-1]
    }) ()
  }

  protected abstract newSelectQuestion(): {typeOfQuestion: string, correct: Promise<boolean>}

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
