interface ChatBase {
  content: string;
  createdAt: string;
}

export interface UserChat extends ChatBase {
  sender: "USER";
}

export interface GPTChat extends ChatBase {
  sender: "GPT";
  id: string;
}

export type Chat = UserChat | GPTChat;
