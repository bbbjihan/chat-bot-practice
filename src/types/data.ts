interface ChatBase {
  content: string;
  createdAt: string;
}

interface UserChat extends ChatBase {
  sender: "USER";
}

interface GPTChat extends ChatBase {
  sender: "GPT";
  id: string;
}

export type Chat = UserChat | GPTChat;
