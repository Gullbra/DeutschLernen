import { IGameState, INoun, IVerb } from "./interfaces";
import { inputProcessor } from "./util.ts";

export const questionNoun = async (gameState: IGameState, word: string, dataObject: INoun): Promise<{wordOrPhrase: string, correct: boolean, error: boolean}> => {
  if (typeof word !== 'string' || word === '') {
    console.log("No or invalid word sent to questionNoun()"); 
    return { wordOrPhrase: word, correct: false, error: true }
  }
  if (
    !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
    !dataObject.article || typeof dataObject.article !== 'string' || dataObject.article === '' || 
    !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
  ) {
    console.log("No or invalid dataObject sent to questionNoun()"); 
    return { wordOrPhrase: word, correct: false, error: true }
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
    terminalInput = inputProcessor(await gameState.rl.question(`What does "${dataObject.article} ${word}" mean"?\nYour answer: `));
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

  return { wordOrPhrase: word, correct: correctAnswer, error: false }
}

export const questionVerb = async (gameState: IGameState, word: string, dataObject: IVerb) => { 
  if (typeof word !== 'string' || word === '') {
    console.log("No or invalid word sent to questionVerb()"); 
    return { wordOrPhrase: word, correct: false, error: true }
  }
  if (
    !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
    !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
  ) {
    console.log("No or invalid dataObject sent to questionVerb()"); 
    return { wordOrPhrase: word, correct: false, error: true }
  }

  let correctAnswer: boolean = false 
  let terminalInput: string;

  const meaningQuestion = async () => {
    terminalInput = inputProcessor(await gameState.rl.question(`What does the werb "${word}" mean"?\nYour answer: `));
    correctAnswer = (terminalInput.length > 3 && terminalInput.substring(0, 3) === 'to ')
      ? dataObject.translation.some(el => "to " + el === terminalInput)
      : dataObject.translation.some(el => el === terminalInput)

    correctAnswer
      ? await gameState.rl.question(`Correct!\n`)
      : await gameState.rl.question(`Not quite. Correct answer is "${dataObject.translation.join(', ')}"\n`)    
  }

  await meaningQuestion()

  return { wordOrPhrase: word, correct: correctAnswer, error: false } 
}

export const questionOther = async (gameSate: IGameState, word: string) => { 
  console.log('Other'); 
  return { wordOrPhrase: word, correct: false, error: false } 
}