const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as () => Promise<IJsonData>
import { IJsonData } from "./interfaces"
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({ input: stdin, output: stdout });

const wordData = await dataReader()
let workingData = wordData
let terminaInput: string;

const inputProcessor = (inputString: string): string => inputString.toLowerCase().trim()

console.log("\n--------------------------")
console.log("Deutch lernen, commandline")
console.log("--------------------------\n")

const startUp = async () => {
  terminaInput = inputProcessor(await rl.question('Start review (Y)?  ')); 
  
  if (terminaInput === 'y') {
    console.log("\nGut! Lass uns anfangen!")
  } else {
    console.log("quit?")
  }


  rl.close()
}

await startUp()



//console.log("hey", Object.keys(wordData))

//export {}