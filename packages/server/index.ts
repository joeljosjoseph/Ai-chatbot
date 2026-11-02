import express, { type Request, type Response } from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: API_KEY,
});

const conversations = new Map<string, string>();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
  const { prompt, conversationId } = req.body;

  const response = await client.responses.create({
    model: 'gpt-6-luna',
    input: prompt,
    // temperature: 0.2, Not supported with gpt-6-luna
    max_output_tokens: 100,
    previous_response_id: conversations.get(conversationId),
  });

  conversations.set(conversationId, response.id);

  res.json({ message: response.output_text });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
