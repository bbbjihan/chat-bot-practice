type Message = string;

export interface Chat {
  request: {
    message: Message;
  };
  status: "START" | "STREAMING" | "DONE";
  createdAt: string;
}
