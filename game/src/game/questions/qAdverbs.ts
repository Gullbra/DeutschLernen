import { IClassAdverb } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { isValidWordClassAdverb } from "../../util/dataValidations.ts";
import { QDegreeOfComparision } from "./aDegreesOfComparision.ts";
import { randomizeArrayElement, randomizeInt } from "../../util/personalLibrary.ts"
import { DegreesOfComparison } from "../gramarHandlers/degreesOfComparison.ts";
import { comparerß, inputProcessor, qResultSimpleUI } from "../../util/util.ts";

export class QWordClassAdverb extends QDegreeOfComparision {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdverb) {
    super(gameState, word, dataObject, isValidWordClassAdverb(word, dataObject))
  }

  protected selectQuestionAnon(): Promise<boolean> {
    if(!this.dataObject.absoluteAdverb && randomizeInt(2) > 0)
      return randomizeInt(1) === 0
        ? this.questionDegreeOfComparision("comparative")
        : this.questionDegreeOfComparision("superlative")
    
    return this.questionMeaning()
  }

  protected selectQuestionUser(): { typeOfQuestion: string; correct: Promise<boolean>; } {
    if (!!this.dataObject.absoluteAdverb) {
      return {
        typeOfQuestion: 'meaning',
        correct: this.questionMeaning()
      }
    }

    const typeOfQuestion = this.getTypeOfQuestionByUserWeight ()

    const correct = (() => {
      switch (typeOfQuestion) {
        case 'meaning': return this.questionMeaning()
        case 'degreesOfComparisionComperativ': return this.questionDegreeOfComparision("comparative")
        case 'degreesOfComparisionSuperlativ': return this.questionDegreeOfComparision("superlative")
        default: throw new Error(`invalid userfocus "${typeOfQuestion}" to QWordClassNoun.selectQuestion`)
      }
    })()

    return {
      typeOfQuestion,
      correct
    }
  }

  protected async questionDegreeOfComparision(degreeOfComparision: string): Promise<boolean> {
    const selectedPhrase = randomizeArrayElement(this.dataObject.examplePhrases)

    if (
      typeof selectedPhrase.phrase !== 'string' || selectedPhrase.phrase.match(/(@doc@)/)?.length !== 1 || 
      typeof selectedPhrase.translation !== 'string' || selectedPhrase.translation.match(/(@doc@)/)?.length !== 1
    ) {
      throw new Error(`QWordClassAdverb() class: questionDegreeOfComparision(): Unvalid degree of comparision dataobject:\n${selectedPhrase}\nfor adjective ${this.word}`)
    }

    const modifiedAdverb = DegreesOfComparison.convert(this.dataObject.stem, degreeOfComparision)

    const blankedPhrase = selectedPhrase.phrase.replace(/(@doc@)/, '_'.repeat(modifiedAdverb.length))
    const expectedPhrase = selectedPhrase.phrase.replace(/(@doc@)/, modifiedAdverb)
    const phraseTranslation = selectedPhrase.translation.replace(/(@doc@)/, `${degreeOfComparision === 'comparative' ? 'more': 'most'} ${randomizeArrayElement(this.dataObject.translation)}`)

    const terminalInput = inputProcessor(await this.gameState.lineReader.question(
      `Using the ${this.dataObject.class} "${this.word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means:\n\n\t"${phraseTranslation}"\n\nYour answer: `
    ))

    const correctlyAnswered = (
      comparerß(terminalInput, modifiedAdverb.toLowerCase()) || 
      comparerß(terminalInput, expectedPhrase.toLowerCase())
    )

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${expectedPhrase}"`))
    return correctlyAnswered
  } 
}
