import express, {Request, Response} from "express";
import cors from 'cors'

const app = express()
const port = 8000

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/api/words', (req: Request, res: Response) => {
  console.log(req.body)
  res.send()
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
