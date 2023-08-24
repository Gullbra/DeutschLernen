import fs from 'fs'
import path from "path";
import { IJsonData } from './interfaces';

export const dataReader = async (): Promise<IJsonData> => fs.promises.readFile(path.join(process.cwd(), 'data', 'data.json')).then(data => JSON.parse(data.toString()))

// TODO: Escape capture
// process.stdin.on('keypress', console.log);
// process.stdin.on(
//   'keypress',  
//   input => {
//     if(input?.sequence === "\\x1B") 
//       shutdown() 
//   } 
// );