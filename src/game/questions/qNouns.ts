import { isValidWordClassNoun } from "../../util/dataValidations.ts";
import { IClassNoun, IGameState } from "../../util/interfaces.ts";
import { comparerContractions, comparerß, inputProcessor, lineUpTranslations, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement, randomizeInt } from "../../util/util.ts";
import { IConvertedNoun, NounCaseConverter } from "../gramarHandlers/nounCaseConverter.ts";
import { QParentClass } from "./parentClasses.ts";

export class QWordClassNoun extends QParentClass {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassNoun) {
    super(gameState, word, dataObject, isValidWordClassNoun(word, dataObject))
  }

  protected selectQuestion(): Promise<boolean> {
    const randomInt = randomizeInt(this.dataObject.plural !== 'no plural' ? 3 : 2)

    switch (randomInt) {
      case 3: return this.questionPlural()
      case 2: return this.questionCase()
      case 1: return this.questionArticle()
      default: return this.questionMeaning()
    }
  }

  protected override async questionMeaning (): Promise<boolean> {
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.dataObject.article} ${this.word}" mean?\nYour answer: `));
    
    if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'the '))
      terminalInput = 'the ' + terminalInput;

    const correctlyAnswered = this.dataObject.translation.some(el => comparerß(terminalInput, "the " + el))

    await this.gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, this.dataObject.translation.map(el => 'the ' + el)))
    return correctlyAnswered
  }

  private async questionArticle (): Promise<boolean> {
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(`Which article corresponds to "${this.word}", meaning: ${lineUpTranslations(this.dataObject.translation)}?\nYour answer: `));

    const correctlyAnswered = terminalInput === this.dataObject.article

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, this.dataObject.article))
    return correctlyAnswered
  }

  private async questionPlural (): Promise<boolean> {
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(`What is the plural form of the ${this.dataObject.class} "${this.dataObject.article} ${this.word}", meaning ${lineUpTranslations(this.dataObject.translation)}?\nYour answer: `));

    if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'die '))
      terminalInput = 'die ' + terminalInput;

    const correctlyAnswered = comparerß(terminalInput, 'die ' + this.dataObject.plural.toLowerCase())   

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, 'die ' + this.dataObject.plural))
    return correctlyAnswered
  }

  private async questionCase (): Promise<boolean> {
    const caseArray = [
      {case: "akusativ", prepositions: ['bis', 'für', 'ohne', 'gegen', 'um']},
      {case: "dativ", prepositions: ['mit', 'nach', 'zu', 'außer', 'bei']},
      {case: "genetiv", prepositions: ['wegen', 'statt', 'trotz']},
    ]

    const selectedCase = randomizeArrayElement(caseArray)
    const selectedPreposition = randomizeArrayElement(selectedCase.prepositions)
    const usePlural = this.dataObject.plural !== 'no plural' && !!randomizeInt(1)
    const useDefinite = !!randomizeInt(1)

    const nounObjNominativ: IConvertedNoun = {
      defArticle: usePlural ? 'die' : this.dataObject.article,
      indefArticle: usePlural ? 'viele' : (this.dataObject.article === 'die' ? 'eine' : 'ein'),
      noun: usePlural ? this.dataObject.plural : this.word
    }
    const nounObjConverted = new NounCaseConverter(
      this.dataObject.article, 
      usePlural ? this.dataObject.plural : this.word, 
      usePlural,
      this.dataObject.specialDeclensions
    ).convertToCase(selectedCase.case)

    const [ questionPhrase, expectedPhrase ] = [ (str: string) => '_'.repeat(str.length), (str: string) => str ].map(fn => {
      return `${selectedPreposition} ${fn(nounObjConverted[useDefinite ? 'defArticle' : 'indefArticle'])} ${fn(nounObjConverted.noun)}, ...`
    })

    const questionFull = [
      `Use the ${selectedCase.case} case of "${nounObjNominativ[useDefinite ? 'defArticle' : 'indefArticle']} ${nounObjNominativ.noun}" to finish the sentence:`,
      `"${questionPhrase}"`,
      `Your answer: `,
    ].join('\n\n')

    let terminalInput = inputProcessor(await this.gameState.lineReader.question(questionFull));
    
    const correctlyAnswered = comparerContractions(terminalInput, expectedPhrase.toLowerCase(), (actual, expected) => {
      const [ modActual, modExpected ] = [actual, expected].map((str) => {
        return str
          .split(', ...').join('')
          .split(`${selectedPreposition}`).join('').trim()
      })

      return comparerß(modActual, modExpected)
    })   
    
    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${expectedPhrase}"`))
    return correctlyAnswered
  }
}
