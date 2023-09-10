import { IClassAdverbAdjective, IClassNoun, IClassPreposition, INewGameState, IWordclass } from "../util/interfaces.ts";
import { inputProcessor } from "../util/util.ts";

const questionInputGenericValidation = (word: string, dataObject: IWordclass): boolean => (
  typeof word !== 'string' || word === '' ||
  !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
  !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
)

export const questionNoun = async (gameState: INewGameState, word: string, dataObject: IClassNoun): Promise<{correct: boolean, error: boolean}> => {
  if (
    questionInputGenericValidation(word, dataObject) || 
    !dataObject.article || typeof dataObject.article !== 'string' || !(dataObject.article === 'der' || dataObject.article === 'das' || dataObject.article === 'die')
  ) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let correctAnswer: boolean = false 
  let terminalInput: string;

  const articleQuestion = async () => {
    terminalInput = inputProcessor(await gameState.rl.question(`Which article corresponds to "${word}", meaning "${dataObject.translation.join(", ")}"?\nYour answer: `));
    correctAnswer = terminalInput === dataObject.article

    correctAnswer
      ? await gameState.rl.question(`Correct!\n`)
      : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.article}"\n`)
  }

  const meaningQuestion = async () => {
    terminalInput = inputProcessor(await gameState.rl.question(`What does the ${dataObject.class} "${dataObject.article} ${word}" mean"?\nYour answer: `));
    correctAnswer = (terminalInput.length > 4 && terminalInput.substring(0, 4) === 'the ')
      ? dataObject.translation.some(el => "the " + el === terminalInput)
      : dataObject.translation.some(el => el === terminalInput)

    correctAnswer
      ? await gameState.rl.question(`Correct!\n`)
      : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.translation.join(', ')}"\n`)    
  }

  Math.round(Math.random()) === 0
    ? await meaningQuestion()
    : await articleQuestion()

  return { correct: correctAnswer, error: false }
}

export const questionAdverb = async (gameState: INewGameState, word: string, dataObject: IClassAdverbAdjective): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }

  let terminalInput = inputProcessor(await gameState.rl.question(`What does the ${dataObject.class} "${word}" mean"?\nYour answer: `));
  let correctAnswer = dataObject.translation.some(el => el === terminalInput)

  correctAnswer
    ? await gameState.rl.question(`Correct!\n`)
    : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.translation.join(', ')}"\n`)   

  return { correct: correctAnswer, error: false }
}

export const questionPreposition = async (gameState: INewGameState, word: string, dataObject: IClassPreposition): Promise<{correct: boolean, error: boolean}> => {
  if (questionInputGenericValidation(word, dataObject)) {
    console.log(`No or invalid dataObject sent to question for word "${word}"`); 
    return { correct: false, error: true }
  }



  
  console.log('preposition: unimplemented')

  return { correct: false, error: false }
}

// export const questionVerb = async (gameState: IGameState, word: string, dataObject: IVerb) => { 
//   if (typeof word !== 'string' || word === '') {
//     console.log("No or invalid word sent to questionVerb()"); 
//     return { wordOrPhrase: word, correct: false, error: true }
//   }
//   if (
//     !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
//     !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
//   ) {
//     console.log("No or invalid dataObject sent to questionVerb()"); 
//     return { wordOrPhrase: word, correct: false, error: true }
//   }

//   let correctAnswer: boolean = false 
//   let terminalInput: string;

//   const meaningQuestion = async () => {
//     terminalInput = inputProcessor(await gameState.rl.question(`What does the verb "${word}" mean"?\nYour answer: `));
//     correctAnswer = (terminalInput.length > 3 && terminalInput.substring(0, 3) === 'to ')
//       ? dataObject.translation.some(el => "to " + el === terminalInput)
//       : dataObject.translation.some(el => el === terminalInput)

//     correctAnswer
//       ? await gameState.rl.question(`Correct!\n`)
//       : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.translation.join(', ')}"\n`)    
//   }

//   await meaningQuestion()

//   return { wordOrPhrase: word, correct: correctAnswer, error: false } 
// }

// export const questionOther = async (gameState: IGameState, word: string, dataObject: IAdverbAdjectivePhrase) => {
//   if (typeof word !== 'string' || word === '') {
//     console.log("No or invalid word sent to questionVerb()"); 
//     return { wordOrPhrase: word, correct: false, error: true }
//   }
//   if (
//     !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
//     !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
//   ) {
//     console.log("No or invalid dataObject sent to questionVerb()"); 
//     return { wordOrPhrase: word, correct: false, error: true }
//   }

//   let correctAnswer: boolean = false 
//   let terminalInput: string;

//   const meaningQuestion = async () => {
//     terminalInput = inputProcessor(await gameState.rl.question(`What does "${word}" mean"?\nYour answer: `));
//     correctAnswer = dataObject.translation.some(el => el === terminalInput)

//     correctAnswer
//       ? await gameState.rl.question(`Correct!\n`)
//       : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.translation.join(', ')}"\n`)    
//   }

//   await meaningQuestion()

//   return { wordOrPhrase: word, correct: correctAnswer, error: false } 
// }