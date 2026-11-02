export type ChatRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  isError?: boolean;
};

export type ChatRequest = {
  prompt: string;
  conversationId: string;
};

// Adjust this to match what your backend actually returns.
export type ChatResponse = {
  message: string;
};
