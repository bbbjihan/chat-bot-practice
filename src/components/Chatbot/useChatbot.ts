import useChatData from "@/hooks/useChatData";
import useOpenAI from "@/hooks/useOpenAI";
import { useEffect } from "react";

const useChatbot = () => {
  const {
    chatData,
    isUserMessageLast,
    appendNewMessage,
    addTextToLastMessage,
    isStreaming,
    toggleStreaming,
  } = useChatData();
  const { startStreamingMessage } = useOpenAI();

  useEffect(() => {
    if (isUserMessageLast) {
      toggleStreaming();
      startStreamingMessage({
        messages: chatData.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        addTextToTarget: addTextToLastMessage,
        callback: toggleStreaming,
      });
    }
  }, [isUserMessageLast]);

  const chatInputProps = {
    appendNewMessage,
    isStreaming,
  };
  const chatAreaProps = {
    chatData,
    isStreaming,
  };

  useEffect(() => console.log("chatData", chatData), [chatData]);
  useEffect(
    () => console.log("isUserMessageLast", isUserMessageLast),
    [isUserMessageLast]
  );
  useEffect(() => console.log("isStreaming", isStreaming), [isStreaming]);

  const isChatDataEmpty = chatData.length === 0;
  return {
    isChatDataEmpty,
    chatInputProps,
    chatAreaProps,
  };
};

export default useChatbot;
