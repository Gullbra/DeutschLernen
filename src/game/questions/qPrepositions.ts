import { IClassPreposition, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI, qResultSimpleUI, randomizeArrayElement } from "../../util/util.ts";

export const questionPreposition = async (gameState: IGameState, word: string, dataObject: IClassPreposition): Promise<{correct: boolean, error: boolean}> => {
  if (
    questionInputGenericValidation(word, dataObject) ||
    !dataObject.forcesCase || !['akustativ', 'dativ', 'wechsel', 'genetiv'].includes(dataObject.forcesCase) ||
    !dataObject.commonUses || !Array.isArray(dataObject.commonUses) || dataObject.commonUses.length === 0
  ) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let correctlyAnswered: boolean = false 
  let terminalInput: string;

  const questions = {
    meaningQuestion: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
  
      correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
  
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
    },
    caseQuestion: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What case(Akusativ, Dativ, Wechsel, or Genetiv) will a noun refered to by the ${dataObject.class} "${word}" have?\nYour answer: `))
  
      correctlyAnswered = terminalInput === dataObject.forcesCase
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, dataObject.forcesCase))
    },
    caseExercise: async () => {
      const selectedUseCase = randomizeArrayElement(dataObject.commonUses)
  
      terminalInput = inputProcessor(await gameState.lineReader.question(`Using the ${dataObject.class} "${word}", write "${selectedUseCase.translation}" in german.\nYour answer: `))
  
      correctlyAnswered = terminalInput === selectedUseCase.example.toLowerCase()
  
      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, selectedUseCase.example))
    }
  }

  const randomizeExerciseType = Math.round(Math.random() * 3)

  if (randomizeExerciseType === 3) {
    await questions.meaningQuestion()
  } else if (randomizeExerciseType === 2) {
    await questions.caseQuestion()
  } else {
    await questions.caseExercise()
  }

  return { correct: correctlyAnswered, error: false }
}