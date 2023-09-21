import { IClassAdverb, IDegreeOfComparisonObject, IGameState } from "../../util/interfaces.ts";
import { inputProcessor, questionInputGenericValidation, qResultMeaningUI, randomizeArrayElement, qResultSimpleUI } from "../../util/util.ts";

const adverbObjectValidation = (word: string, dataObject:IClassAdverb) => {
  if (
    !(dataObject.comparative && dataObject.comparative.word && dataObject.comparative.translation 
    && dataObject.comparative.useInPhrase && Array.isArray(dataObject.comparative.useInPhrase) && dataObject.comparative.useInPhrase.length > 0)
  ){
    console.log(`Invalid "comparative" for adverb ${word}`); return false;
  }
  if (
    !(dataObject.superlative && dataObject.superlative.word && dataObject.superlative.translation 
    && dataObject.superlative.useInPhrase && Array.isArray(dataObject.superlative.useInPhrase) && dataObject.superlative.useInPhrase.length > 0)
  ){
    console.log(`Invalid "superlative" for adverb ${word}`); return false;
  }
  return true
}
const validationDegreeOfComparisionObject = (degreeOfComparision: IDegreeOfComparisonObject): boolean => (
  Boolean(degreeOfComparision.word) && Boolean(degreeOfComparision.translation) && degreeOfComparision.useInPhrase && Array.isArray(degreeOfComparision.useInPhrase) && degreeOfComparision.useInPhrase.length > 0
)

export const questionAdverb = async (gameState: IGameState, word: string, dataObject: IClassAdverb): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject) && adverbObjectValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput: string, correctlyAnswered: boolean = false;

  const questions = {
    meaningQuestion: async () => {
      terminalInput = inputProcessor(await gameState.lineReader.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));

      correctlyAnswered = dataObject.translation.some(el => el === terminalInput)
    
      await gameState.lineReader.question(qResultMeaningUI(correctlyAnswered, terminalInput, dataObject.translation))
    },

    comparativeAndSuperlativeQuestion: async (degreeOfComparision: IDegreeOfComparisonObject) => {
      if (!validationDegreeOfComparisionObject(degreeOfComparision))
        throw new Error(`Unvalid degree of comparision dataobject for adjective ${word}`)

      const selectedPhrase = randomizeArrayElement(degreeOfComparision.useInPhrase)
      const blankedPhrase = selectedPhrase.phrase.replace(degreeOfComparision.word, '_'.repeat(degreeOfComparision.word.length))

      terminalInput = inputProcessor(await gameState.lineReader.question(
        `Using the ${dataObject.class} "${word}", complete the phrase;\n\n\t"${blankedPhrase}",\n\nso that it means: "${selectedPhrase.translation}".\nYour answer: `
      ))

      correctlyAnswered = (terminalInput === degreeOfComparision.word.toLowerCase() || terminalInput === selectedPhrase.phrase.toLowerCase())

      await gameState.lineReader.question(qResultSimpleUI(correctlyAnswered, `"${selectedPhrase.phrase}"`))
    },
  }

  if(!dataObject.absoluteAdverb) {
    const randomizeExerciseType = Math.round(Math.random() * 3)

    try {
      if (randomizeExerciseType === 3) {
        await questions.meaningQuestion()
      } else if (randomizeExerciseType === 2) {
        await questions.comparativeAndSuperlativeQuestion(dataObject.comparative)
      } else {
        await questions.comparativeAndSuperlativeQuestion(dataObject.superlative)
      }
    } catch (err) {
      console.log(`Error at ${word}: ` + (err as {message: string}).message)
    }
  } else {
    await questions.meaningQuestion()
  }

  return { correct: correctlyAnswered, error: false }
}
