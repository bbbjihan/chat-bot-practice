import { Chat, ChatStatus } from "@/types/data";
import { useMemo, useState } from "react";
import { v4 } from "uuid";

const useChatHistories = () => {
  const [chatHistories, setChatHistories] = useState<Array<Chat>>([]);

  const appendHistory = (chat: Chat) =>
    setChatHistories((prev) => [...prev, chat]);

  const createNewChat = (message: string) =>
    appendHistory({
      id: v4(),
      request: {
        message,
      },
      status: "START",
      createdAt: new Date().toISOString(),
    });

  const processChatStatus = (chatId: string) =>
    setChatHistories((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              status: chat.status === "START" ? "STREAMING" : "DONE",
            }
          : chat
      )
    );

  const wholeChatStatus: ChatStatus = useMemo(
    () =>
      chatHistories.some((chat) => chat.status === "STREAMING")
        ? "STREAMING"
        : "DONE",
    [chatHistories]
  );

  return {
    chatHistories,
    createNewChat,
    processChatStatus,
    wholeChatStatus,
  };
};

export default useChatHistories;
