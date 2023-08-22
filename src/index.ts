import { IJsonData } from "./interfaces"
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as () => Promise<IJsonData>

const rl = readline.createInterface({ input: stdin, output: stdout });
const wordData = await dataReader()
let workingData: IJsonData;
let workingKeys: string[]
let questionsToAnswer: number
let workingQuestionNumber: number = 0
let correctAnswers: string[]
let wrongAnswers: string[]
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

const determineQuestion = async () => {
  if (workingQuestionNumber === questionsToAnswer)
    return await shutdown()
  
  workingQuestionNumber += 1
  const randomIndex = Math.ceil(Math.random()*workingKeys.length)
  const workingObject = workingData[workingKeys[randomIndex]]


  console.log("workingobject:", workingObject)
  //TODO: diffrent type of question based on what kind of word (noun, verb, adjective etc)

  // terminalInput = inputProcessor(await rl.question(`What does "${workingKeys[randomIndex]}" mean?\n`));
  // const correct = workingObject.translation.some(el => el.toLowerCase() === terminalInput)
  // console.log(`\nCaptured answer: ${terminalInput}; correct?: ${correct}` )
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
  correctAnswers = []
  wrongAnswers = []

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