import { Chat } from "@/types/data";
import { useState } from "react";

const useChatHistories = () => {
  const [chatHistories, setChatHistories] = useState<Array<Chat>>([]);

  const appendHistory = (chat: Chat) =>
    setChatHistories((prev) => [...prev, chat]);

  return {
    chatHistories,
    appendHistory,
  };
};

export default useChatHistories;
