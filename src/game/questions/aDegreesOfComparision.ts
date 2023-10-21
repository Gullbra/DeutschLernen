import { IDegreeOfComparisonObject } from "../../interfaces/wordsPhrasesGrammar.ts"
import { comparerß, inputProcessor, qResultSimpleUI } from "../../util/util.ts"
import { randomizeArrayElement } from "../../util/personalLibrary.ts"
import { QParentClass } from "./aParentClass.ts"

export abstract class QDegreeOfComparision extends QParentClass {
  protected async questionDegreeOfComparision (degreeOfComparision: IDegreeOfComparisonObject): Promise<boolean> {
    const selectedPhrase = randomizeArrayElement(degreeOfComparision.useInPhrase)

    if (typeof selectedPhrase.phrase !== 'string' || typeof selectedPhrase.translation !== 'string')
      throw new Error(`Unvalid degree of comparision dataobject:\n${selectedPhrase}\nfor adjective ${this.word}`)

    const blankedPhrase = selectedPhrase.phrase.replace(degreeOfComparision.word, '_'.repeat(degreeOfComparision.word.length))

    const terminalInput = inputProcessor(await this.gameState.lineReader.question(
      `Using the ${this.dataObject.class} "${this.word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means:\n\n\t"${selectedPhrase.translation}"\n\nYour answer: `
    ))

    const correctlyAnswered = (comparerß(terminalInput, degreeOfComparision.word.toLowerCase()) || comparerß(terminalInput, selectedPhrase.phrase.toLowerCase()))

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
    return correctlyAnswered
  }
}