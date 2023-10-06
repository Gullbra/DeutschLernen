import { IClassAdverb, IClassNoun, IGameState, IWord, IClassPreposition, IGameInput, TDataArray, IClassAdjective, IRawUserProfile, TUserProfile } from "../util/interfaces.ts";
import { inputProcessor, randomizeArrayElement, randomizeArrayIndex } from "../util/util.ts";
import { QWordClassPreposition } from "./questions/qPrepositions.ts";
import { QWordClassNoun } from "./questions/qNouns.ts";
import { QWordClassAdverb } from "./questions/qAdverbs.ts";
import { QWordClassAdjective } from "./questions/qAdjectives.ts";

export class Game { 
  private gameState: IGameState
  private inclusiveFilters?: string[]

  constructor (input: IGameInput, inclusiveFilters?: string[]) { 
    this.gameState = {
      ...input,
      fullData: [],
      currentData: [],
      userProfile: new Map(),
      questionsToAnswer: 0,
      currentQuestionNumber: 0,
      currentTotalWeight: 0,
      correctedAnswers: [] as { dataObject: IWord, correct: boolean }[]
    }
    this.inclusiveFilters = inclusiveFilters
  }

  async startUp () {
    await Promise.all([
      this.gameState.dataHandler.getGameData(this.inclusiveFilters),
      this.gameState.dataHandler.getUserProfile()
    ]).then(data => {
        this.gameState = {
          ...this.gameState,
          fullData: data[0],
          currentData: data[0].slice(),
          userProfile: data[1],
          currentTotalWeight: data[0].reduce((sum, dataObj) => sum + dataObj.weight, 0)
        }
      })
      .catch(async (err) => {console.log(err); return await this.shutdown()})

    console.log("\n--------------------------")
    console.log("Deutch lernen, commandline")
    console.log("--------------------------\n")
  
    await this.modeChoice().catch(async (err) => { console.log(err.message); await this.shutdown() })
  }

  private async modeChoice (): Promise<void> {
    if (this.gameState.currentData.length === 0) {
      console.log('No data found\n')
      return await this.shutdown()
    }

    let terminalInput = Number(inputProcessor(await this.gameState.lineReader.question(`How many questions do want? (type a number, max ${this.gameState.currentData.length})  `))); 
  
    if (isNaN(terminalInput) || terminalInput <= 0 || terminalInput > this.gameState.currentData.length) {
      await this.gameState.lineReader.question(`invalid input.`)
      return await this.modeChoice()
    }
  
    this.gameState.questionsToAnswer = terminalInput
    await this.gameState.lineReader.question(`\n${this.gameState.questionsToAnswer} questions will be provided. Lass uns anfangen!\n`)
  
    await this.determineQuestion()
  }

  private async determineQuestion () {
    if (this.gameState.currentQuestionNumber === this.gameState.questionsToAnswer)
      return await this.resultAndRestart()
    
    if (this.gameState.currentData.length === 0) {
      console.log('No data found!\n')
      return await this.shutdown()
    }
    
    const selectionNumber = Math.round(Math.random() * this.gameState.currentTotalWeight)
    const [selectedDataobject, selectedIndex] = (() => {
      for (let i = 0, sum = 0; i <= this.gameState.currentTotalWeight; i++) {
        sum += this.gameState.currentData[i].weight

        if(sum >= selectionNumber)
          return [this.gameState.currentData[i], i]
      }
      return [{} as IWord, -1]
    })()

    if (selectedIndex === -1) {
      console.log('Error in question choice based on weight')
      return await this.shutdown()
    }

    if (selectedDataobject.classes.length === 0) {
      console.log(`Badly formated data: No word classes correspoding to word "${selectedDataobject.word}"`)
      return await this.shutdown()
    } 

    const selectedWordClass = randomizeArrayElement(selectedDataobject.classes)

    this.gameState.currentQuestionNumber += 1
    this.gameState.currentData.splice(selectedIndex, 1)
    this.gameState.currentTotalWeight -= selectedDataobject.weight
  
    console.log(`${this.gameState.currentQuestionNumber})`)

    switch (selectedWordClass.class) {
      case 'noun':
        return await this.handleResult(selectedDataobject, selectedWordClass.class, await new QWordClassNoun(this.gameState, selectedDataobject.word, selectedWordClass as IClassNoun).newGetQnA());

      // case 'adverb':
      //   return await this.handleResult(selectedDataobject, await new QWordClassAdverb(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdverb).getQnA());

      // case 'preposition':
      //   return await this.handleResult(selectedDataobject, await new QWordClassPreposition(this.gameState, selectedDataobject.word, selectedWordClass as IClassPreposition).getQnA());

      // case 'adjective':
      //   return await this.handleResult(selectedDataobject, await new QWordClassAdjective(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdjective).getQnA());

      // case 'verb':
      //   return await this.handleResult(await questionVerb(this.gameState, workingWordOrPhrase, workingDataObject?.verb as IVerb));

      // case 'phrase':
      //   return await this.handleResult(await questionOther(this.gameState, workingWordOrPhrase, workingDataObject?.phrase as IAdverbAdjectivePhrase));
    
      default:
        console.log(`Error: unhandled word/phrase class: "${selectedWordClass.class}"!`)
        return await this.shutdown();
    }
  }

  private async handleResult (dataObject: IWord, wClass: string, {correct, error, typeOfQuestion}: {correct: boolean, error: boolean, typeOfQuestion: string}) {
    if (error) {
      if (this.gameState.correctedAnswers.length > 0)
        await this.handleSave()
      return await this.shutdown();
    }

    this.updateUserProfile(wClass, typeOfQuestion, correct)
    dataObject.weight = this.weightHandler(dataObject.weight, correct)

    this.gameState.correctedAnswers.push({ dataObject, correct })
    await this.determineQuestion()
  }

  private weightHandler (startingWeight: number, correct: boolean): number {
    if (correct) {
      return Math.max(10, Math.round(startingWeight * 0.75))
    }
    return startingWeight + 100
  }

  private updateUserProfile (wordClass: string, typeOfQuestion: string, correct: boolean) {
    if (!this.gameState.userProfile.has(wordClass) || !this.gameState.userProfile.get(wordClass)?.has(typeOfQuestion))
      throw new Error (`No userprofile entry for "${wordClass}" "${typeOfQuestion}"`)

    const newWeight = correct
      ? Math.max(50, Math.round((this.gameState.userProfile.get(wordClass)?.get(typeOfQuestion) as number) * 0.9))
      : Math.max(50, (this.gameState.userProfile.get(wordClass)?.get(typeOfQuestion) as number) + 25)

    this.gameState.userProfile.get(wordClass)?.set(typeOfQuestion, newWeight)
  }

  private async resultAndRestart (): Promise<void> {
    console.log(`All ${this.gameState.questionsToAnswer} done! Score: ${this.gameState.correctedAnswers.filter(el => el.correct).length}/${this.gameState.correctedAnswers.length}`)

    if(this.gameState.currentData.length === 0) {
      console.log('\nAll words and phrases reviewed!')
      await this.handleSave()
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
      : await (async () => {
          await this.handleSave()
          await this.shutdown()
        })() 
  }

  private async handleSave () {
    if(process.env.ENV_SAVING === 'no_save') 
      return console.log("No data saved due to \"ENV_SAVING='no_save'\"")

    console.log('Saving...')
    await Promise.all([
      this.gameState.dataHandler.saveGameData(this.gameState.correctedAnswers.map(obj => obj.dataObject)),
      this.gameState.dataHandler.saveUserProfile(this.gameState.userProfile)
    ])
    return
  }

  private async shutdown () {
    console.log("\nShutting down...")
    this.gameState.lineReader.close()
  }
}