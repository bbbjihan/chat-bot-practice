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
