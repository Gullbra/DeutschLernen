import { IClassAdverb, IDegreeOfComparisonObject, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, qResultMeaningUI, randomizeArrayElement, qResultSimpleUI } from "../../util/util.ts";
import { validationWordClassAdverb, validationDegreeOfComparisionObject, validationWordClassGeneric } from "../../util/dataValidations.ts";

export const questionAdverb = async (gameState: IGameState, word: string, dataObject: IClassAdverb): Promise<{correct: boolean, error: boolean}> => {
  if (validationWordClassGeneric(word, dataObject) && validationWordClassAdverb(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correct: boolean, error = false;

  const questions = {
    questionMeaning: async (): Promise<boolean> => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));

      const correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
    
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
      return correctlyAnswered
    },

    questionDegreeOfComparision: async (degreeOfComparision: IDegreeOfComparisonObject): Promise<boolean> => {
      if (!validationDegreeOfComparisionObject(degreeOfComparision))
        throw new Error(`Unvalid degree of comparision dataobject for adjective ${word}`)

      const selectedPhrase = randomizeArrayElement(degreeOfComparision.useInPhrase)
      const blankedPhrase = selectedPhrase.phrase.replace(degreeOfComparision.word, '_'.repeat(degreeOfComparision.word.length))

      terminalInput = inputProcessor(await gameState.lineReader.question(
        `Using the ${dataObject.class} "${word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means: "${selectedPhrase.translation}".\nYour answer: `
      ))

      const correctlyAnswered = (terminalInput === degreeOfComparision.word.toLowerCase() || terminalInput === selectedPhrase.phrase.toLowerCase())

      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
      return correctlyAnswered
    },
  }



  if(!dataObject.absoluteAdverb && Math.round(Math.random() * 2) > 0) {
    try {
      return {
        correct: Math.round(Math.random()) === 0
          ? await questions.questionDegreeOfComparision(dataObject.comparative)
          : await questions.questionDegreeOfComparision(dataObject.superlative),
        error
      }
    } catch (err) {
      console.log(`Error at ${word}: ` + (err as {message: string}).message)
      return { correct: false, error: true }
    }
  } 
  
  return { correct: await questions.questionMeaning(), error: false }
}