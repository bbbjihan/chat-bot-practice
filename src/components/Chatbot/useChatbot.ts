import useChatTree from "@/hooks/useChatTree";
import useOpenAI from "@/hooks/useOpenAI";
import { useEffect } from "react";

const useChatbot = () => {
  const {
    chatAreaData,
    isUserMessageLast,
    appendNewMessage,
    addTextToLastMessage,
    isStreaming,
    setIsStreamingLeaf,
  } = useChatTree();
  const { startStreamingMessage, abortStreaming } = useOpenAI();

  useEffect(() => {
    if (isUserMessageLast) {
      setIsStreamingLeaf(true);
      startStreamingMessage({
        messages: chatAreaData.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        addTextToTarget: addTextToLastMessage,
        callback: () => setIsStreamingLeaf(false),
      });
    }
  }, [isUserMessageLast]);

  const chatInputProps = {
    appendNewMessage,
    isStreaming,
    abortStreaming,
  };
  const chatAreaProps = {
    chatAreaData,
    isStreaming,
  };

  const isChatDataEmpty = chatAreaData.length === 0;
  return {
    isChatDataEmpty,
    chatInputProps,
    chatAreaProps,
  };
};

export default useChatbot;
