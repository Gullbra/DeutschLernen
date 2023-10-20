import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { DataHandler } from './../data/dataHandler.ts';
import { IGameState, IQuestionProfile, IQuestionReturnObject } from "../interfaces/dataStructures.ts";
import { IClassAdverb, IClassNoun, IWord, IClassPreposition, IClassAdjective, IWordclass } from "../interfaces/wordsPhrasesGrammar.ts";
import { inputProcessor } from "../util/util.ts";
import { randomizeArrayElement, randomizeInt } from "../util/personalLibrary.ts"
import { QWordClassNoun } from "./questions/qNouns.ts";
import { QWordClassAdverb } from "./questions/qAdverbs.ts";
import { QWordClassAdjective } from "./questions/qAdjectives.ts";
// import { QWordClassPreposition } from "./questions/qPrepositions.ts";

export class Game { 
  private gameState: IGameState
  private inclusiveFilters?: string[]

  constructor (inclusiveFilters?: string[]) { 
    this.gameState = {
      dataHandler: new DataHandler(),
      lineReader: createInterface({ input: stdin, output: stdout }),
      fullData: [],
      currentData: [],
      questionsToAnswer: 0,
      currentQuestionNumber: 0,
      currentTotalWeight: 0,
      correctedAnswers: [] as { dataObject: IWord, correct: boolean }[]
    }
    this.inclusiveFilters = inclusiveFilters
  }


  async startUp () {
    console.log("\n--------------------------")
    console.log("Deutch lernen, commandline")
    console.log("--------------------------\n")
  
    await this.setupSettings().catch(async (err) => { console.log(err.message); await this.shutdown() })
  }


  private async setupSettings (): Promise<void> {
    let terminalInput = inputProcessor(await this.gameState.lineReader.question(`Do you want to load a user profile? (y/n)  `)) 
  
    if (!['n', 'y'].includes(terminalInput)) {
      await this.gameState.lineReader.question(`invalid input`)
      return await this.setupSettings()
    }
  
    await this.setupGameState({ loadUser: terminalInput === 'y' })
  }


  private async setupGameState (optionObj?: any) {
    const promiseArray: Promise<any>[] = [
      this.gameState.dataHandler.getGameData(this.inclusiveFilters)
        .then(data => {
          this.gameState.fullData = data
          this.gameState.currentData = data.slice()
        })
    ]

    if (!!optionObj?.loadUser) {
      const loadUserProfile = this.gameState.dataHandler.getUserProfile()
        .then(data => {
          if (!data.hasAll(this.inclusiveFilters || ['adjective', 'noun', 'adverb', 'preposition'])){
            throw Error('invalid userprofile. TODO: auto-set up when user profile is invalid.')
          }

          this.gameState.userProfile = data
        })
        
      promiseArray.push(loadUserProfile)
    }

    const minAndMax = (value: number, minLimit: number, maxLimit: number): number => {
      return  Math.min(Math.max(value, minLimit), maxLimit)
    }

    await Promise.all(promiseArray).then(() => {
      this.gameState.currentTotalWeight = !this.gameState.userProfile 
        ? this.gameState.currentData.reduce((sum, dataObj) => sum + dataObj.weight, 0)
        : this.gameState.currentData.reduce(
            (sum, dataObj, index) => {
              const mWeight = dataObj.classes.reduce(
                (prev: number, cl: IWordclass): number => Math.round(prev * (1 + minAndMax(this.gameState.userProfile?.get(cl.class)?.weight || 100, -50, 50)/100)), 
                dataObj.weight
              )

              this.gameState.currentData[index].modifiedWeight = mWeight
              return sum + mWeight
            }, 
            0
          )
    })

    return await this.chooseNrOfQuestions()
  }


  private async chooseNrOfQuestions (): Promise<void> {
    if (this.gameState.currentData.length === 0) {
      console.log('No data found\n')
      return await this.shutdown()
    }

    let terminalInput = Number(inputProcessor(await this.gameState.lineReader.question(`How many questions do want? (type a number, max ${this.gameState.currentData.length})  `))); 
  
    if (isNaN(terminalInput) || terminalInput <= 0 || terminalInput > this.gameState.currentData.length) {
      await this.gameState.lineReader.question(`invalid input.`)
      return await this.chooseNrOfQuestions()
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
    
    const selectionNumber = randomizeInt(this.gameState.currentTotalWeight)
    const [selectedDataobject, selectedIndex] = (() => {
      for (let i = 0, sum = 0; i <= this.gameState.currentTotalWeight; i++) {
        sum += this.gameState.currentData[i].modifiedWeight || this.gameState.currentData[i].weight

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
    this.gameState.currentTotalWeight -= selectedDataobject.modifiedWeight || selectedDataobject.weight
  
    console.log(`${this.gameState.currentQuestionNumber})`)

    return await this.handleResult(
      selectedDataobject, 
      await (async (): Promise<IQuestionReturnObject> => {
        switch (selectedWordClass.class) {
          case 'noun':
            return await new QWordClassNoun(this.gameState, selectedDataobject.word, selectedWordClass as IClassNoun).getQnA();
    
          // case 'adverb':
          //   await new QWordClassAdverb(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdverb).getQnA();
    
          // case 'adjective':
          //   await new QWordClassAdjective(this.gameState, selectedDataobject.word, selectedWordClass as IClassAdjective).getQnA();
    
          // case 'preposition':
          //   await new QWordClassPreposition(this.gameState, selectedDataobject.word, selectedWordClass as IClassPreposition).getQnA();
    
          // case 'verb':
          //   throw new Error('Not implemented!')
    
          // case 'phrase':
          //   throw new Error('Not implemented!')
        
          default:
            console.log(`Error: unhandled word/phrase class: "${selectedWordClass.class}"!`)
            return {error: true};
        }
      }) ()
    );
  }


  private async handleResult (dataObject: IWord, {correct, error, wClass, typeOfQuestion}: IQuestionReturnObject) {
    if (error || correct === undefined) {
      if (this.gameState.correctedAnswers.length > 0)
        await this.handleSave()
      return await this.shutdown();
    }

    if(!!this.gameState.userProfile && wClass && typeOfQuestion) {
      delete dataObject.modifiedWeight
      this.updateUserProfile(wClass, typeOfQuestion, correct)
    }

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
    if (!this.gameState?.userProfile?.has(wordClass) || !this.gameState.userProfile.get(wordClass)?.subQuestions.has(typeOfQuestion))
      throw new Error (`No userprofile entry for "${wordClass}" "${typeOfQuestion}"`)

    const newClassWeight = correct
      ? Math.max(50, Math.round((this.gameState.userProfile.get(wordClass)?.weight as number) * 0.95))
      : Math.max(50, (this.gameState.userProfile.get(wordClass)?.weight as number) + 20)
    const newTypeWeight = correct
      ? Math.max(50, Math.round((this.gameState.userProfile.get(wordClass)?.subQuestions.get(typeOfQuestion) as number) * 0.9))
      : Math.max(50, (this.gameState.userProfile.get(wordClass)?.subQuestions.get(typeOfQuestion) as number) + 50)

    this.gameState.userProfile.set(
      wordClass,
      {
        ...this.gameState.userProfile.get(wordClass) || {} as IQuestionProfile,
        weight: newClassWeight
      }
    )
    this.gameState.userProfile.get(wordClass)?.subQuestions.set(typeOfQuestion, newTypeWeight)
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
          await this.chooseNrOfQuestions() 
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
    const promiseArray = [
      this.gameState.dataHandler.saveGameData(this.gameState.correctedAnswers.map(obj => obj.dataObject)),
    ]
    
    if (!!this.gameState.userProfile)
      promiseArray.push(this.gameState.dataHandler.saveUserProfile(this.gameState.userProfile))

    return await Promise.all(promiseArray)
  }

  
  private async shutdown () {
    console.log("\nShutting down...")
    this.gameState.lineReader.close()
  }
}