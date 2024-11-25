interface MessageBase {
  id: string;
  content: string;
}
export interface UserMessage extends MessageBase {
  role: "user";
}
export interface AssistantMessage extends MessageBase {
  role: "assistant";
  isStreaming?: boolean;
}
export type Message = UserMessage | AssistantMessage;

export type ChatData = Array<Message>;
