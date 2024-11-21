import { Chat, ChatStatus } from "@/types/data";
import { useMemo, useState } from "react";
import { v4 } from "uuid";

const useChatData = () => {
  const [chatHistories, setChatHistories] = useState<Array<Chat>>([]);

  const appendHistory = (chat: Chat) =>
    setChatHistories((prev) => [...prev, chat]);

  const createNewChat = (message: string) =>
    appendHistory({
      id: v4(),
      request: {
        message,
      },
      response: {
        message: null,
      },
      status: "STREAMING",
      createdAt: new Date().toISOString(),
    });

  const endStreaming = (chatId: string, responseMessage: string) =>
    setChatHistories((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              response: {
                message: responseMessage,
              },
              status: "DONE",
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
    endStreaming,
    wholeChatStatus,
  };
};

export default useChatData;
