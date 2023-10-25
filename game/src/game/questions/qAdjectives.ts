import { isValidWordClassAdjective } from "../../util/dataValidations.ts";
import { IClassAdjective } from "../../interfaces/wordsPhrasesGrammar.ts";
import { IGameState } from "../../interfaces/dataStructures.ts";
import { QDegreeOfComparision } from "./aDegreesOfComparision.ts";
import { AdjectiveDecliner } from "../gramarHandlers/adjectiveDeclension.ts";
import { NounCaseConverter } from "../gramarHandlers/nounCaseConverter.ts";
import { comparerContractions, comparerß, inputProcessor, qResultSimpleUI } from "../../util/util.ts";
import { randomizeArrayElement, randomizeInt } from "../../util/personalLibrary.ts"


export class QWordClassAdjective extends QDegreeOfComparision {
  protected questionDegreeOfComparision(degreeOfComparision: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  constructor (gameState: IGameState, word: string, protected dataObject: IClassAdjective) {
    super(gameState, word, dataObject, isValidWordClassAdjective(word, dataObject))
  }
  
  protected selectQuestionAnon(): Promise<boolean> {

    // if(!this.dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0) {
    //   try {
    //     return {
    //       correct: Math.round(Math.random()) === 0
    //         ? await this.questionDegreeOfComparision(this.dataObject.comparative)
    //         : await this.questionDegreeOfComparision(this.dataObject.superlative),
    //       error: false
    //     }
    //   } catch (err) {
    //     console.log(`Error at ${this.word}: ` + (err as {message: string}).message)
    //     return { correct: false, error: true }
    //   }
    // } 
    
    // return this.questionMeaning()
    return this.questionDeclension()
  }

  protected selectQuestionUser(): { typeOfQuestion: string; correct: Promise<boolean>; } {
    throw new Error("Method not implemented.");
  }
  
  private async questionDeclension (): Promise<boolean> {
    const nounObj: { article: string, noun: string, plural: string, translation: string } = {
      article: 'der',
      noun: 'Schuh',
      plural: 'Schuhe',
      translation: 'shoe'
    }

    const casePrepositionMap = [
      {case: "akusativ", prepositions: ['bis', 'für', 'ohne', 'gegen', 'um']},
      {case: "dativ", prepositions: ['mit', 'nach', 'zu', 'außer', 'bei']},
      {case: "genetiv", prepositions: ['wegen', 'statt', 'trotz']},
    ]

    const [ selectedNoun, selectedCase, isDefinite, isPlural ] = [
      nounObj, // randomizeArrayElement(this.dataObject.supportNouns),
      randomizeArrayElement(['nominativ', 'akusativ', 'dativ', 'genetiv']),
      randomizeInt(1) === 0,
      randomizeInt(1) === 0 
    ]
    const selectedPreposition = selectedCase === 'nominativ' 
      ? undefined 
      : randomizeArrayElement(casePrepositionMap.find(obj => obj.case === selectedCase)?.prepositions as string[])

    const [ declinedAdj, convertedNoun ] = [
      new AdjectiveDecliner(this.word).declineAdjective(selectedCase, 'masculine', isPlural, isDefinite),
      new NounCaseConverter(nounObj.article, nounObj.noun, isPlural).convertToCase(selectedCase)
    ]

    const [ questionPhrase, expectedPhrase ] = ['_'.repeat(declinedAdj.length), declinedAdj].map(adj => {
      return `${!!selectedPreposition ? selectedPreposition + " ": ""}${isDefinite ? convertedNoun.defArticle : convertedNoun.indefArticle} ${adj} ${convertedNoun.noun}`
    })

    const questionFull = [
      `Using the ${this.dataObject.class} "${this.word}", correctly describe the noun "${
        isPlural 
          ? 'die' 
          : selectedNoun.article
      } ${
        isPlural 
          ? selectedNoun.plural 
          : selectedNoun.noun
      }"`,
      `"${questionPhrase}"`,
      `Your answer: `
    ].join('\n\n')
    
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(questionFull));

    if (!!selectedPreposition && ['der','das','die','den','dem'].includes(terminalInput.substring(0,3))) {
      terminalInput = [selectedPreposition, terminalInput].join(' ')
    }

    // ! Add handling for when noun is included in answer


    const correctlyAnswered = comparerContractions(terminalInput, expectedPhrase.toLowerCase(), (actual, expected) => {
      return comparerß(actual, expected, (actual, expected) => {
        const [ modActual, modExpected ] = [actual, expected].map((str) => {

          const modStr = str
          .split(` ${(isPlural ? selectedNoun.plural : selectedNoun.noun).toLowerCase()}`).join('N')
          return !!selectedPreposition
            ? modStr.split(selectedPreposition.split('ß').join('ss')).join('').trim()
            : modStr
        })
        
        return modActual === modExpected
      })
    }) 

    await this.gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${expectedPhrase}"`))
    return correctlyAnswered
  } 
}
