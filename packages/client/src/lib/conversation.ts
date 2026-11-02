const STORAGE_KEY = 'chat:conversationId';

export function getConversationId(): string {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // localStorage unavailable: fall back to an in-memory id
    return crypto.randomUUID();
  }
}

export function resetConversationId(): string {
  const id = crypto.randomUUID();
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // ignore
  }
  return id;
}
