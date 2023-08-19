import fs from 'fs'
import path from "path";
import { IJsonData } from './interfaces';

export const dataReader = async (): Promise<IJsonData> => fs.promises.readFile(path.join(process.cwd(), 'data', 'data.json')).then(data => JSON.parse(data.toString()))