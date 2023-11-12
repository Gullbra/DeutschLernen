import express, {Request, Response} from "express";
import cors from 'cors'

import fs from 'fs'
import path from "path"

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});



app
  .route('/api/words')
  .post((req: Request, res: Response) => {
    res.send()
  })
  .get(async (req: Request, res: Response) => {
    res.json(await fReader('noun').then(data => JSON.parse(data.toString())))
  })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const fReader = async (fileName: string): Promise<any> => fs.promises.readFile(path.join(process.cwd(), '..', 'data', `data.${fileName}.json`))