import { Chat } from "@/types/data";
import { useState } from "react";

const useChatHistories = () => {
  const [chatHistories, setChatHistories] = useState<Array<Chat>>([]);

  const appendHistory = (chat: Chat) =>
    setChatHistories((prev) => [...prev, chat]);

  const createNewChat = (message: string) =>
    appendHistory({
      request: {
        message,
      },
      response: {
        message: "",
        id: "",
      },
      status: "START",
      createdAt: new Date().toISOString(),
    });

  return {
    chatHistories,
    createNewChat,
  };
};

export default useChatHistories;
