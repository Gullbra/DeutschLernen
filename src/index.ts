import { IJsonData, INoun, IAdverbAdjectivePhrase } from "./interfaces"
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as () => Promise<IJsonData>

const rl = readline.createInterface({ input: stdin, output: stdout });
const wordData = await dataReader()
let workingData: IJsonData;
let workingKeys: string[]
let questionsToAnswer: number
let workingQuestionNumber: number = 0
let correctedAnswers: {[key: string]: boolean}[] = []
let terminalInput: string | number;

const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()
 
const shutdown = async () => {
  console.log("\nShutting down...")
  rl.close()
}

const restartQuestion = async () => {
  terminalInput = inputProcessor(await rl.question('Start review (Y)?  '));
  console.log("\n")
  terminalInput === "y"
    ? await (async () => { console.log("restarting...\n"); await startUp() })()
    : await shutdown()
}


const handleResult = async (wordOrPhrase: string, correct: boolean) => {
  const answer = new Object() as {[key: string]: boolean}
  answer[wordOrPhrase] = correct
  correctedAnswers.push(answer)
  await determineQuestion()
}

const questionNoun = async (word: string, dataObject: INoun) => {
  if (typeof word !== 'string' || word === '') {
    console.log("No or invalid word sent to questionNoun()"); return await shutdown()
  }
  if (
    !dataObject || typeof dataObject !== 'object' || Array.isArray(dataObject) ||
    !dataObject.article || typeof dataObject.article !== 'string' || dataObject.article === '' || 
    !dataObject.translation || !Array.isArray(dataObject.translation) || dataObject.translation.length === 0
  ) {
    console.log("No or invalid dataObject sent to questionNoun()"); return await shutdown()
  }

  let correctAnweredMeaning: boolean;
  let correctAnweredArticle: boolean

  terminalInput = inputProcessor(await rl.question(`What does "${word}" mean?\n`));
  correctAnweredMeaning = dataObject.translation.some(el => el.toLowerCase() === terminalInput)

  if (!correctAnweredMeaning) {
    console.log(`Not quite, the correct answer is ${
      dataObject.translation.length === 1 
        ? `"${dataObject.translation[1]}"`
        : `one of "${dataObject.translation.join(', ')}"`
    }`)
    console.log(`Your answer: ${terminalInput[0].toUpperCase() + terminalInput.substring(1)}`)
  }

  terminalInput = inputProcessor(await rl.question(`And which article corresponds to "${word}"?\n`));
  correctAnweredArticle = terminalInput === dataObject.article

  if (!correctAnweredArticle) {
    console.log(`Not quite, the correct answer is "${dataObject.article}"`)
    console.log(`Your answer: ${terminalInput}`)
  }

  await handleResult(word, correctAnweredMeaning && correctAnweredArticle)
}

const questionVerb = async () => { console.log('Verb'); await determineQuestion() }
const questionOther = async () => { console.log('Other'); await determineQuestion() }

const determineQuestion = async () => {
  if (workingQuestionNumber === questionsToAnswer)
    return await shutdown()
  
  workingQuestionNumber += 1

  const randomIndex = Math.ceil(Math.random()*workingKeys.length)
  const workingWordOrPhrase = workingKeys[randomIndex]
  const workingDataObject = workingData[workingWordOrPhrase]
  workingKeys.splice(randomIndex, 1)
  delete workingData[workingWordOrPhrase]
  
  const wordClasses = Object.keys(workingDataObject)
  const selectedWordClass = wordClasses[Math.floor(Math.random()*wordClasses.length)]

  switch (selectedWordClass) {
    case 'noun':
      return await questionNoun(workingWordOrPhrase, workingDataObject?.noun as INoun);

    case 'verb':
      return await questionVerb();

    case 'adverb':
    case 'adjective':
    case 'phrase':
      return await questionOther();
  
    default:
      console.log("Error: unhandled word/phrase class!")
      return await shutdown();
  }
}

const modeChoice = async () => {
  const invalidInput = async () => {
    console.log(`invalid input. Please type a number between 1 and ${workingKeys.length}`)
    await modeChoice()
  }

  terminalInput = Number(inputProcessor(await rl.question(`How many questions do want? (type a number, max ${workingKeys.length}) \n`))); 

  if (isNaN(terminalInput) || terminalInput <= 0 || terminalInput > workingKeys.length)
    return await invalidInput()

  questionsToAnswer = terminalInput
  await determineQuestion()
}

const startUp = async () => {
  workingData = wordData
  workingKeys = Object.keys(workingData)
  questionsToAnswer = 0 
  workingQuestionNumber = 0 
  correctedAnswers = []

  console.log("\n--------------------------")
  console.log("Deutch lernen, commandline")
  console.log("--------------------------\n")

  await modeChoice()
}

await startUp()
rl.close()

console.log("end")






// TODO: Escape capture
// process.stdin.on('keypress', console.log);
// process.stdin.on(
//   'keypress',  
//   input => {
//     if(input?.sequence === "\\x1B") 
//       shutdown() 
//   } 
// );