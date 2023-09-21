import { validationWordClassGeneric, validationWordClassPreposition } from "../../util/dataValidations.ts";
import { IClassPreposition, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";

export const questionPreposition = async (gameState: IGameState, word: string, dataObject: IClassPreposition): Promise<{correct: boolean, error: boolean}> => {
  if (validationWordClassGeneric(word, dataObject) || validationWordClassPreposition(dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correct: boolean, error = false

  const questions = {
    meaningQuestion: async (): Promise<boolean> => {
      let terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
    
      const correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
    
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
      return correctlyAnswered
    },
    questionCase: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What case(Akusativ, Dativ, Wechsel, or Genetiv) will a noun refered to by the ${dataObject.class} "${word}" have?\nYour answer: `))
  
      const correctlyAnswered = terminalInput === dataObject.forcesCase
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, dataObject.forcesCase))
      return correctlyAnswered
    },
    questionExerciseCase: async (): Promise<boolean> => {
      const selectedUseCase = randomizeArrayElement(dataObject.commonUses)
  
      terminalInput = inputProcessor(await gameState.lineReader.question(`Using the ${dataObject.class} "${word}", write "${selectedUseCase.translation}" in german.\nYour answer: `))
  
      const correctlyAnswered = terminalInput === selectedUseCase.example.toLowerCase()
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, selectedUseCase.example))
      return correctlyAnswered
    }
  }

  correct = await (async () => {
    const randomizeExerciseType = Math.round(Math.random() * 3)

    if (randomizeExerciseType === 3) {
      return await questions.meaningQuestion()
    } else if (randomizeExerciseType === 2) {
      return await questions.questionCase()
    } else {
      return await questions.questionExerciseCase()
    }
  }) ()

  return { correct, error }
}