import { isValidWordClassNoun } from "../../util/dataValidations.ts";
import { IClassNoun } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { comparerContractions, comparerß, inputProcessor, lineUpTranslations, qResultMeaningUI, qResultSimpleUI } from "../../util/util.ts";
import { randomizeArrayElement, randomizeInt } from "../../util/personalLibrary.ts"
import { IConvertedNoun, NounCaseConverter } from "../gramarHandlers/nounCaseConverter.ts";
import { QParentClass } from "./aParentClass.ts";

export class QWordClassNoun extends QParentClass {
  constructor (gameState: IGameState, word: string, protected dataObject: IClassNoun) {
    super(gameState, word, dataObject, isValidWordClassNoun(word, dataObject))
  }

  protected selectQuestionUser(): {typeOfQuestion: string, correct: Promise<boolean>} {
    if (!this.gameState?.userProfile?.has('noun'))
      throw new Error(`Invalid userprofile: no entry for wordClass "${this.dataObject.class}"`)

    const [ questionTypes, questionWeights ] = [ 
      Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.subQuestions.keys() as IterableIterator<string>), 
      Array.from(this.gameState.userProfile?.get(this.dataObject.class)?.subQuestions.values() as IterableIterator<number>)
    ]

    if (this.dataObject.plural === 'no plural') {
      const index = questionTypes.findIndex(qType => qType === 'plural')
      questionTypes.splice(index, 1)
      questionWeights.splice(index, 1)
    }

    const typeOfQuestion = this.getTypeOfQuestionByUserWeight (questionTypes, questionWeights)

    const correct = (() => {
      switch (typeOfQuestion) {
        case 'plural': return this.questionPlural()
        case 'case': return this.questionCase()
        case 'article': return this.questionArticle()
        case 'meaning': return this.questionMeaning()
        default: throw new Error(`invalid userfocus "${typeOfQuestion}" to QWordClassNoun.selectQuestion`)
      }
    })()

    return {
      typeOfQuestion,
      correct
    }
  }

  protected selectQuestionAnon(): Promise<boolean> {
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
    
    if (['der','das','die','den','dem'].includes(terminalInput.substring(0,3))) {
      terminalInput = [selectedPreposition, terminalInput].join(' ')
    }

    const correctlyAnswered = comparerContractions(terminalInput, expectedPhrase.toLowerCase(), (actual, expected) => {
      return comparerß(actual, expected, (actual, expected) => {
        const [ modActual, modExpected ] = [actual, expected].map((str) => {
          return str
            .split(', ...').join('')
            .split(selectedPreposition.split('ß').join('ss')).join('').trim()
        })
        
        return modActual === modExpected
      })
    })   
    
    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${expectedPhrase}"`))
    return correctlyAnswered
  }
}
