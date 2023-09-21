import { IClassAdverb, IClassNoun, IGameState, IWord, IClassPreposition, IGameInput, TDataArray, IClassAdjective } from "../util/interfaces.ts";
import { inputProcessor, randomizeArrayElement, randomizeArrayIndex } from "../util/util.ts";
import { questionPreposition } from "./questions/qPrepositions.ts";
import { QWordClassNoun } from "./questions/qNouns.ts";
import { questionAdverb } from "./questions/qAdverbs.ts";
import { questionAdjective } from "./questions/qAdjectives.ts";

export class Game { 
  private gameState: IGameState
  private inclusiveFilters?: string[]

  constructor (input: IGameInput, inclusiveFilters?: string[]) { 
    this.gameState = {
      ...input,
      fullData: [],
      currentData: [],
      questionsToAnswer: 0,
      currentQuestionNumber: 0,
      currentTotalWeight: 0,
      correctedAnswers: [] as { dataObject: IWord, correctlyAnswered: boolean }[]
    }
    this.inclusiveFilters = inclusiveFilters
  }

  async startUp () { 
    await this.gameState.dataHandler.getData(this.inclusiveFilters)
      .then(data => {
        this.gameState = {
          ...this.gameState,
          fullData: data,
          currentData: data.slice(),
          currentTotalWeight: data.reduce((sum, dataObj) => sum + dataObj.weight, 0)
        }
      })
      .catch(err => console.log(err))

    console.log("\n--------------------------")
    console.log("Deutch lernen, commandline")
    console.log("--------------------------\n")
  
    await this.modeChoice()
  }

  async modeChoice (): Promise<void> {
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

  async determineQuestion () {
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
  
    switch (selectedWordClass.class) {
      case 'noun':
        return await this.handleResult(selectedDataobject, await new QWordClassNoun(this.gameState, selectedDataobject.word, selectedWordClass as IClassNoun).getQuestion());

      case 'adverb':
        return await this.handleResult(selectedDataobject, await questionAdverb(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdverb));

      case 'preposition':
        return await this.handleResult(selectedDataobject, await questionPreposition(this.gameState, selectedDataobject.word, selectedWordClass as IClassPreposition));

      case 'adjective':
        return await this.handleResult(selectedDataobject, await questionAdjective(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdjective));

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

    dataObject.weight = this.weightHandler(dataObject.weight, correct)

    this.gameState.correctedAnswers.push({ dataObject, correctlyAnswered: correct})

    await this.determineQuestion()
  }

  weightHandler (startingWeight: number, correct: boolean): number {
    if (correct) {
      return Math.max(20, Math.round(startingWeight * 0.75))
    }
    return startingWeight + 50
  }

  async resultAndRestart (): Promise<void> {
    console.log(`All ${this.gameState.questionsToAnswer} done! Score: ${this.gameState.correctedAnswers.filter(el => el.correctlyAnswered).length}/${this.gameState.correctedAnswers.length}`)

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

  async handleSave () {
    console.log('Saving...')
    return await this.gameState.dataHandler.saveData(
      this.gameState.correctedAnswers.map(obj => obj.dataObject)
    )
  }

  async shutdown () {
    console.log("\nShutting down...")
    this.gameState.lineReader.close()
  }
}