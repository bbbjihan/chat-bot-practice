import { ChatData } from "@/types/data";
import chatNodeUtils, { ChatNode } from "@/utils/chatNodeUtils";
import { isNull, isUndefined } from "@/utils/typeNarrowFunctions";
import { useMemo, useState } from "react";

const useChatTree = () => {
  const [chatTree, setChatTree] = useState<ChatNode>();

  const appendNewMessage: (message: string) => void = (message) =>
    setChatTree((prev) =>
      isUndefined(prev)
        ? chatNodeUtils.constructNode(message)
        : chatNodeUtils.createNewChat(prev, message)
    );

  const addTextToLastMessage: (text: string) => void = (text) =>
    setChatTree((prev) =>
      isUndefined(prev)
        ? undefined
        : chatNodeUtils.addTextToLeafAssistantContent(prev, text)
    );

  const chatAreaData = useMemo<ChatData>(
    () =>
      isUndefined(chatTree) ? [] : chatNodeUtils.getChatAreaData(chatTree),
    [chatTree]
  );

  const isStreaming = useMemo(
    () =>
      isUndefined(chatTree)
        ? false
        : chatNodeUtils.getisWholeChatStreaming(chatTree),
    [chatTree]
  );

  const setIsStreamingLeaf = (newValue: boolean) =>
    setChatTree((prev) =>
      isUndefined(prev)
        ? undefined
        : chatNodeUtils.setIsStreamingLeaf(prev, newValue)
    );

  const isUserMessageLast = useMemo(
    () =>
      isUndefined(chatTree)
        ? false
        : isNull(chatNodeUtils.getLeafNode(chatTree).assistant),
    [chatTree]
  );

  return {
    chatAreaData,

    appendNewMessage,
    addTextToLastMessage,

    isStreaming,
    setIsStreamingLeaf,

    isUserMessageLast,
  };
};

export default useChatTree;
