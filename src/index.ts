import { IJsonData } from "./interfaces"
const dataReader = (await import(process.env.MODE === "ts-node" ? './dataReader.ts' : './dataReader')).dataReader as () => Promise<IJsonData>

const wordData = await dataReader()

console.log("hey", Object.keys(wordData))

//export {}