import { IClassAdverbAdjective, IClassNoun, IGameState, IWord, IClassPreposition, IGameInput } from "../util/interfaces.ts";
import { inputProcessor } from "../util/util.ts";
import { questionPreposition } from "./questions/qPrepositions.ts";
import { questionNoun } from "./questions/qNouns.ts";
import { questionAdverb } from "./questions/qAdverbs.ts";

export class Game { 
  private gameState: IGameState

  constructor (input: IGameInput) { 
    this.gameState = {
      ...input,
      currentData: input.fullData.slice(),
      questionsToAnswer: 0,
      currentQuestionNumber: 0,
      correctedAnswers: [] as { dataObject: IWord, correctlyAnswered: boolean }[]
    }
  }

  async startUp () {  
    console.log("\n--------------------------")
    console.log("Deutch lernen, commandline")
    console.log("--------------------------\n")
  
    await this.modeChoice()
  }

  async modeChoice (): Promise<void> {
    let terminalInput = Number(inputProcessor(await this.gameState.lineReader.question(`How many questions do want? (type a number, max ${this.gameState.currentData.length})  `))); 
  
    if (isNaN(terminalInput) || terminalInput <= 0 || terminalInput > this.gameState.currentData.length) {
      await this.gameState.lineReader.question(`invalid input.`)
      return await this.modeChoice()
    }
  
    this.gameState.questionsToAnswer = terminalInput
    await this.gameState.lineReader.question(`\n${this.gameState.questionsToAnswer} questions will be provided. Lass uns anfangen!\n`)
  
    await this.determineQuestion()
  }

  async determineQuestion () {
    if (this.gameState.currentQuestionNumber === this.gameState.questionsToAnswer)
      return await this.resultAndRestart()
    
    this.gameState.currentQuestionNumber += 1
  
    const randomIndex = Math.round(Math.random()*(this.gameState.currentData.length - 1))
    const currentDataObject = this.gameState.currentData[randomIndex]

    if (currentDataObject.classes.length === 0) {
      console.log(`Badly formated data: No word classes correspoding to word "${currentDataObject.word}"`)
      return await this.shutdown()
    } 

    const selectedWordClass = currentDataObject.classes.length === 1
      ? currentDataObject.classes[0]
      : currentDataObject.classes[Math.floor(Math.random()*currentDataObject.classes.length)]

    this.gameState.currentData.splice(randomIndex, 1)
  
    switch (selectedWordClass.class) {
      case 'noun':
        return await this.handleResult(currentDataObject, await questionNoun(this.gameState, currentDataObject.word, selectedWordClass as IClassNoun));

      case 'adverb':
        return await this.handleResult(currentDataObject, await questionAdverb(this.gameState, currentDataObject.word, selectedWordClass as IClassAdverbAdjective));

      case 'preposition':
        return await this.handleResult(currentDataObject, await questionPreposition(this.gameState, currentDataObject.word, selectedWordClass as IClassPreposition));

      // case 'adjective':
      //   return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.adjective as IAdverbAdjectivePhrase));

      // case 'verb':
      //   return await this.handleResult(await questionVerb(this.gameState, workingWordOrPhrase, workingDataObject?.verb as IVerb));

      // case 'phrase':
      //   return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.phrase as IAdverbAdjectivePhrase));
    
      default:
        console.log(`Error: unhandled word/phrase class: "${selectedWordClass.class}"!`)
        return await this.shutdown();
    }
  }

  async handleResult (dataObject: IWord, {correct, error}: {correct: boolean, error: boolean}) {
    if (error) this.shutdown();

    this.gameState.correctedAnswers.push({ dataObject, correctlyAnswered: correct})

    await this.determineQuestion()
  }

  async resultAndRestart (): Promise<void> {
    console.log(`All ${this.gameState.questionsToAnswer} done! Score: ${this.gameState.correctedAnswers.filter(el => el.correctlyAnswered).length}/${this.gameState.correctedAnswers.length}`)

    if(this.gameState.currentData.length === 0) {
      console.log(' \nAll words and phrases reviewed!')
      return await this.shutdown()
    }

    let terminalInput = inputProcessor(await this.gameState.lineReader.question('Review more questions (Y/N)?  '));

    if (terminalInput !== 'y' && terminalInput !== 'n') {
      console.log('Invalid input\n')
      return await this.resultAndRestart()
    }

    terminalInput === "y"
      ? await (async () => {
          this.gameState.questionsToAnswer = this.gameState.currentQuestionNumber = 0 
          console.log("restarting...\n"); 
          await this.modeChoice() 
        })()
      : await this.shutdown()
  }

  async shutdown () {
    console.log("\nShutting down...")
    this.gameState.lineReader.close()
  }
}