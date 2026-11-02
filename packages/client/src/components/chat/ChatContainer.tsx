import { Plus } from 'lucide-react';
import { useChat } from '../../hooks/useChat';
import { Button } from '../ui/button';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

export function ChatContainer() {
  const { messages, isLoading, sendMessage, newChat } = useChat();

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col border-x">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold">Chat</h1>
        <Button variant="outline" size="sm" onClick={newChat}>
          <Plus /> New chat
        </Button>
      </header>
      <MessageList messages={messages} isLoading={isLoading} />
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
