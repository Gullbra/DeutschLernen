import fs from 'fs'
import path from "path";

export const dataReader = async (fileName: string): Promise<any> => fs.promises.readFile(path.join(process.cwd(), 'data', fileName)).then(data => JSON.parse(data.toString()))

// TODO: Escape capture
// process.stdin.on('keypress', console.log);
// process.stdin.on(
//   'keypress',  
//   input => {
//     if(input?.sequence === "\\x1B") 
//       shutdown() 
//   } 
// );