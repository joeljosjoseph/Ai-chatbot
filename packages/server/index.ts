import express, { type Request, type Response } from 'express';
import z from 'zod';
import { chatService } from './services/chat.service';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
const API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required.')
    .max(1000, 'Prompt length exceeded. Max 1000 characters.'),
  conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  if (!parseResult.success)
    res.status(400).json(z.treeifyError(parseResult.error));

  try {
    const { prompt, conversationId } = req.body;
    const response = await chatService.sendMessage(prompt, conversationId);

    res.json({ message: response.message });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate a response.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
