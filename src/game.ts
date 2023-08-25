import { IAdverbAdjectivePhrase, IGameState, INoun, IVerb } from "./interfaces";
import { questionNoun, questionOther, questionVerb } from "./questions.ts";
import { inputProcessor } from "./util.ts";

export class Game { 
  private gameState: IGameState

  constructor (gameState: IGameState) { 
    this.gameState = gameState
    this.gameState.workingData = this.gameState.wordData
    this.gameState.workingKeys = Object.keys(this.gameState.workingData)
  }

  async startUp () {  
    console.log("\n--------------------------")
    console.log("Deutch lernen, commandline")
    console.log("--------------------------\n")
  
    await this.modeChoice()
  }

  async modeChoice (): Promise<void> {
    let terminalInput = Number(inputProcessor(await this.gameState.rl.question(`How many questions do want? (type a number, max ${this.gameState.workingKeys.length})  `))); 
  
    if (isNaN(terminalInput) || terminalInput <= 0 || terminalInput > this.gameState.workingKeys.length) {
      await this.gameState.rl.question(`invalid input.`)
      return await this.modeChoice()
    }
  
    this.gameState.questionsToAnswer = terminalInput
    await this.gameState.rl.question(`\n${this.gameState.questionsToAnswer} questions will be provided. Lass uns anfangen!\n`)
  
    await this.determineQuestion()
  }

  async determineQuestion () {
    if (this.gameState.workingQuestionNumber === this.gameState.questionsToAnswer)
      return await this.resultAndRestart()
    
    this.gameState.workingQuestionNumber += 1
  
    const randomIndex = Math.floor(Math.random()*this.gameState.workingKeys.length)
    const workingWordOrPhrase = this.gameState.workingKeys[randomIndex]
    const workingDataObject = this.gameState.workingData[workingWordOrPhrase]

    this.gameState.workingKeys.splice(randomIndex, 1)
    delete this.gameState.workingData[workingWordOrPhrase]
    
    const wordClasses = Object.keys(workingDataObject)
    const selectedWordClass = wordClasses[Math.floor(Math.random()*wordClasses.length)]
  
    switch (selectedWordClass) {
      case 'noun':
        return await this.handleResult(await questionNoun(this.gameState, workingWordOrPhrase, workingDataObject?.noun as INoun));
  
      case 'verb':
        return await this.handleResult(await questionVerb(this.gameState, workingWordOrPhrase, workingDataObject?.verb as IVerb));
  
      case 'adverb':
        return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.adverb as IAdverbAdjectivePhrase));

      case 'adjective':
        return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.adjective as IAdverbAdjectivePhrase));

      case 'phrase':
        return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.phrase as IAdverbAdjectivePhrase));
    
      default:
        console.log("Error: unhandled word/phrase class!")
        return await this.shutdown();
    }
  }

  async handleResult ({wordOrPhrase, correct, error}: {wordOrPhrase: string, correct: boolean, error: boolean}) {
    if (error) this.shutdown();

    this.gameState.correctedAnswers.push({wordOrPhrase, correctlyAnswered: correct})

    await this.determineQuestion()
  }

  async resultAndRestart (): Promise<void> {
    console.log(`All ${this.gameState.questionsToAnswer} done! Score: ${this.gameState.correctedAnswers.filter(el => el.correctlyAnswered).length}/${this.gameState.correctedAnswers.length}`)

    if(this.gameState.workingKeys.length === 0) {
      console.log(' \nAll words and phrases reviewed!')
      return await this.shutdown()
    }

    let terminalInput = inputProcessor(await this.gameState.rl.question('Review more questions (Y/N)?  '));

    if (terminalInput !== 'y' && terminalInput !== 'n') {
      console.log('Invalid input\n')
      return await this.resultAndRestart()
    }

    this.gameState.questionsToAnswer = 0 
    this.gameState.workingQuestionNumber = 0 
    this.gameState.correctedAnswers = []

    terminalInput === "y"
      ? await (async () => { console.log("restarting...\n"); await this.modeChoice() })()
      : await this.shutdown()
  }

  async shutdown () {
    console.log("\nShutting down...")
    this.gameState.rl.close()
  }
}