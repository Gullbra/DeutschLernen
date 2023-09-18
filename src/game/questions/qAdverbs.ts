import { IClassAdverb, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI, randomizeArrayElement, qResultSimpleUI } from "../../util/util.ts";

const adverbObjectValidation = (word: string, dataObject:IClassAdverb) => {
  if (!(dataObject.comparative && dataObject.comparative.word && dataObject.comparative.translation)){
    console.log(`Invalid "comparative" for adverb ${word}`); return false;
  }
  if (!(dataObject.superlative && dataObject.superlative.word && dataObject.superlative.translation)){
    console.log(`Invalid "superlative" for adverb ${word}`); return false;
  }
  if (!(dataObject.testPhrases && Array.isArray(dataObject.testPhrases) && dataObject.testPhrases.length > 0)){
    console.log(`Invalid "testPhrases" for adverb ${word}`); return false;
  }
  return true
}

const comparativeSuperlativeValidation = (selectedPhrase: {dividedPhrase: string[], translation: string[]}): boolean => (
  Array.isArray(selectedPhrase.dividedPhrase) && Array.isArray(selectedPhrase.translation) &&
  selectedPhrase.dividedPhrase.length === 2 && selectedPhrase.translation.length === 2
)

export const questionAdverb = async (gameState: IGameState, word: string, dataObject: IClassAdverb): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject) && adverbObjectValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correctlyAnswered: boolean = false

  const questions = {
    meaningQuestion: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));

      correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
    
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
    },
    comparativeAndSuperlativeQuestion: async (comparative: boolean) => {
      const selectedPhrase = randomizeArrayElement(dataObject.testPhrases)
      const selectedWordTranslation = comparative
        ? dataObject.comparative
        : dataObject.superlative
      const constructedQuestion =  `${selectedPhrase.translation[0]} ${selectedWordTranslation.translation} ${selectedPhrase.translation[1]}`
      const constructedAnswer =  `${selectedPhrase.dividedPhrase[0]} ${selectedWordTranslation.word} ${selectedPhrase.dividedPhrase[1]}`

      if (!comparativeSuperlativeValidation(selectedPhrase))
        throw new Error(`Unvalid dataobject for adjective ${word}`)

      terminalInput = inputProcessor(await gameState.lineReader.question(
        `Using the ${dataObject.class} "${word}", write the phrase "${constructedQuestion}" in german.\nYour answer: `
      ))

      correctlyAnswered = terminalInput === constructedAnswer.toLowerCase()

      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${constructedAnswer}"`))
    },
  }


  if(!dataObject.absoluteAdverb) {
    const randomizeExerciseType = Math.round(Math.random() * 3)

    try {
      if (randomizeExerciseType === 3) {
        await questions.meaningQuestion()
      } else if (randomizeExerciseType === 2) {
        await questions.comparativeAndSuperlativeQuestion(true)
      } else {
        await questions.comparativeAndSuperlativeQuestion(false)
      }
    } catch (err) {
      console.log(`Error at ${word}: ` + (err as {message: string}).message)
    }
  } else {
    await questions.meaningQuestion()
  }


  return { correct: correctlyAnswered, error: false }
}

class questionConstructorAdverb {
  private gameState: IGameState;
  private word: string;
  private dataObject: IClassAdverb;

  constructor (gameState: IGameState, word: string, dataObject: IClassAdverb) {
    this.gameState = gameState
    this.word = word
    this.dataObject = dataObject
  }

  async getQuestion () {

  }
}