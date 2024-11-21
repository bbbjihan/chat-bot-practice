export type ChatStatus = "STREAMING" | "DONE";
export interface Chat {
  id: string;
  request: {
    message: string;
  };
  response: {
    message: string | null;
  };
  status: ChatStatus;
  createdAt: string;
}

export type ChatForOpenAI = {
  role: string;
  content: string;
};

interface MessageBase {
  id?: string;
  content: string;
}
interface UserMessage extends MessageBase {
  role: "user";
}
interface AssistantMessage extends MessageBase {
  role: "assistant";
  isStreaming?: boolean;
}
export type Message = UserMessage | AssistantMessage;
export interface ChatData {
  messages: Array<Message>;
}
