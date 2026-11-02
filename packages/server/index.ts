import express, { type Request, type Response } from 'express'

const app = express()
const port = process.env.PORT || 3000
const API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req: Request, res: Response) => { res.send("Hello World!") })

app.get('/api/hello', (req: Request, res: Response) => { res.json({ message: "Hello World" }) })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})