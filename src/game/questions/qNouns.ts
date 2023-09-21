import { validationWordClassGeneric, validationWordClassNoun } from "../../util/dataValidations.ts";
import { IClassNoun, IGameState, IWordclass } from "../../util/interfaces.ts";
import { inputProcessor, lineUpTranslations, qResultMeaningUI, qResultSimpleUI } from "../../util/util.ts";
import { QParentClass } from "./parentClass.ts";

export class QWordClassNoun extends QParentClass {
  protected dataObject: IClassNoun;

  constructor (gameState: IGameState, word: string, dataObject: IClassNoun) {
    super(gameState, word, dataObject)
    this.dataObject = dataObject
  }
  
  async getQuestion(): Promise<{ correct: boolean; error: boolean; }> {
    if (validationWordClassGeneric(this.word, this.dataObject) || validationWordClassNoun(this.dataObject)) {
      console.log(`No or invalid dataObject sent to question for word "${this.word}"`); 
      return { correct: false, error: true }
    }

    if (this.dataObject.plural !== 'no plural' && Math.round(Math.random()*2) === 0) {
      return { correct: await this.questionPlural(), error: false }
    }
  
    return { 
      correct: Math.round(Math.random()) === 0
        ? await this.questionMeaning()
        : await this.questionArticle(), 
      error: false
    }
  }

  protected override async questionMeaning (): Promise<boolean> {
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(`What does the ${this.dataObject.class} "${this.dataObject.article} ${this.word}" mean?\nYour answer: `));
    
    if(!(terminalInput.length > 4 && terminalInput.substring(0, 4) === 'the '))
      terminalInput = 'the ' + terminalInput;

    const correctlyAnswered = this.dataObject.translation.some(el => "the " + el === terminalInput)

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

    const correctlyAnswered = 'die ' + this.dataObject.plural.toLowerCase() === terminalInput    

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, 'die ' + this.dataObject.plural))
    return correctlyAnswered
  }
}
