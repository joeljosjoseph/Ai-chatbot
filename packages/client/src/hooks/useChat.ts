import { useCallback, useRef, useState } from 'react';
import { sendChatMessage } from '../lib/api/chat';
import { getConversationId, resetConversationId } from '../lib/conversation';
import type { ChatMessage } from '../types/chat';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationId = useRef<string>(getConversationId());
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (prompt: string) => {
      const text = prompt.trim();
      if (!text || isLoading) return;

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: text,
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const data = await sendChatMessage(
          { prompt: text, conversationId: conversationId.current },
          controller.signal,
        );
        setMessages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), role: 'assistant', content: data.message },
        ]);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Something went wrong. Please try again.',
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [isLoading],
  );

  const newChat = useCallback(() => {
    abortRef.current?.abort();
    conversationId.current = resetConversationId();
    setMessages([]);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, sendMessage, newChat };
}
