type Message = string;

export type ChatStatus = "STREAMING" | "DONE";
export interface Chat {
  id: string;
  request: {
    message: Message;
  };
  response: {
    message: Message | null;
  };
  status: ChatStatus;
  createdAt: string;
}

export type ChatForOpenAI = {
  role: string;
  content: string;
};
