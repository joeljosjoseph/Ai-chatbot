import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

const API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: API_KEY,
});

type ChatResponse = {
  id: string;
  message: string;
};

export const chatService = {
  async sendMessage(
    prompt: string,
    conversationId: string,
  ): Promise<ChatResponse> {
    const response = await client.responses.create({
      model: 'gpt-6-luna',
      input: prompt,
      // temperature: 0.2, Not supported with gpt-6-luna
      max_output_tokens: 100,
      previous_response_id:
        conversationRepository.getLastResponseId(conversationId),
    });

    conversationRepository.setLastResponseId(conversationId, response.id);

    return { id: response.id, message: response.output_text };
  },
};
