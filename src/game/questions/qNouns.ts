import { isValidWordClassNoun } from "../../util/dataValidations.ts";
import { IClassNoun, IGameState } from "../../util/interfaces.ts";
import { comparerß, inputProcessor, lineUpTranslations, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";
import { IConvertedNoun, NounCaseConverter } from "../gramarHandlers/nounCaseConverter.ts";
import { QParentClass } from "./parentClasses.ts";

export class QWordClassNoun extends QParentClass {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassNoun) {
    super(gameState, word, dataObject, isValidWordClassNoun(word, dataObject))
  }

  protected selectQuestion(): Promise<boolean> {
    return this.questionCase()

    if (this.dataObject.plural !== 'no plural' && Math.round(Math.random()*2) === 0)
      return this.questionPlural()
  
    return Math.round(Math.random()) === 0
      ? this.questionMeaning()
      : this.questionArticle()
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
    // throw Error("Not implemented!")

    //const usePlural = this.dataObject.plural !== 'no plural' && Math.round(Math.random()) === 0
    const usePlural = false

    const conversionObj = new NounCaseConverter(this.dataObject.article, usePlural ? this.dataObject.plural : this.word, usePlural, true)
    const selectedCase = randomizeArrayElement([
      'akusativ', 
      'dativ', 
      //'genetiv'
    ])

    const caseConverted: IConvertedNoun = conversionObj.convertToCase(selectedCase)

    // ! Construct a "question phrase" with prepositions based on the randomized case

    let terminalInput = inputProcessor(
      await this.gameState.lineReader.question(
        `What's the ${selectedCase} form of ${this.dataObject.class}'s "${usePlural ? this.dataObject.plural : this.word }"?\nYour answer: `
      )
    );

    const correctlyAnswered = comparerß(terminalInput, `${caseConverted.defArticle} ${caseConverted.noun.toLowerCase()}`)   

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `${caseConverted.defArticle} ${caseConverted.noun}`))
    return correctlyAnswered
  }
}
