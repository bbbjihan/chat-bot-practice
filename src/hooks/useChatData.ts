import { Message } from "@/types/data";
import { useMemo, useState } from "react";

const useChatData = () => {
  const [chatData, setChatData] = useState<Array<Message>>([]);
  const isUserMessageLast = useMemo(
    () =>
      chatData.length !== 0 && chatData[chatData.length - 1].role === "user",
    [chatData]
  );
  const appendNewMessage = (message: Message) =>
    setChatData((prev) => [...prev, message]);

  const addTextToLastMessage = (text: string) =>
    setChatData((prev) =>
      prev[prev.length - 1].role === "user"
        ? [...prev, { role: "assistant", content: text }]
        : prev.map((message, index) =>
            index === prev.length - 1
              ? { ...message, content: message.content + text }
              : message
          )
    );

  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const toggleStreaming = () => setIsStreaming((prev) => !prev);

  return {
    chatData,
    isUserMessageLast,
    appendNewMessage,
    addTextToLastMessage,
    isStreaming,
    toggleStreaming,
  };
};

export default useChatData;
