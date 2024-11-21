type Message = string;

export type ChatStatus = "START" | "STREAMING" | "DONE";
export interface Chat {
  id: string;
  request: {
    message: Message;
  };
  status: ChatStatus;
  createdAt: string;
}
