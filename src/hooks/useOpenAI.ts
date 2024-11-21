import { Chat, ChatForOpenAI } from "@/types/data";
import { createNewStream, openStreamToString } from "@/utils/openAIUtils";
import { isNull } from "@/utils/typeNarrowFunctions";
import { useEffect, useMemo, useState } from "react";
interface Props {
  chatId: string;
  chatHistories: Array<Chat>;
  endStreaming: (chatId: string, responseMessage: string) => void;
}
const useOpenAI = ({ chatId, chatHistories, endStreaming }: Props) => {
  const [message, setMessage] = useState<string>("");
  const messages: Array<ChatForOpenAI> = useMemo(
    () =>
      chatHistories
        .map((chat) => [
          { role: "user", content: chat.request.message },
          ...(!isNull(chat.response.message)
            ? [{ role: "assistant", content: chat.response.message }]
            : []),
        ])
        .flat(),
    [chatHistories]
  );

  const appendMessage = (message: string) =>
    setMessage((prev) => prev + message);

  const fetchResponseMessage = (responseMessage: string) =>
    endStreaming(chatId, responseMessage);

  const startStreaming = () => {
    createNewStream({ messages }).then((stream) => {
      openStreamToString({
        stream,
        appendToTarget: appendMessage,
        callback: fetchResponseMessage,
      });
    });
  };

  useEffect(startStreaming, []);

  return {
    message,
  };
};

export default useOpenAI;
