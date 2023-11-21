import express, { Request, Response } from "express";
import cors from 'cors'
import path from "path"
import { createHandler } from './../../node_modules/graphql-http/lib/use/express';

import { qraphqlSettings } from './graphql/index'
import { DataHandler } from '../data/dataHandler' 

const app = express()
const port = 8000
const dataHandler = new DataHandler()

app.use(express.json())
app.use(cors())


if (!process.env.DEV_MODE) {
  app.use(express.static(path.join(process.cwd(), 'frontend', 'build')))
}

app.get('/check_connection', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

app.post('/graphql', createHandler({ 
  schema: qraphqlSettings.schema, 
  rootValue: qraphqlSettings.resolvers 
}));

app
  .route('/api/words')
  .post((req: Request, res: Response) => res.send())
  .get(async (req: Request, res: Response) => {
    return res
      .json(await dataHandler.getGameData().catch(err => {error: err.messager}))
  })

app.listen(port, () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`));
