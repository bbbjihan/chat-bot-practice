import { ChatData } from "@/types/data";
import chatNodeUtils, { ChatNode, ChatTree } from "@/utils/chatNodeUtils";
import { isNull, isUndefined } from "@/utils/typeNarrowFunctions";
import { useMemo, useState } from "react";

const useChatTree = () => {
  const [chatTree, setChatTree] = useState<ChatTree>(
    chatNodeUtils.createNewTree()
  );

  const appendNewMessage: (message: string) => void = (message) =>
    setChatTree((prev) =>
      chatNodeUtils.appendNewChild(
        prev,
        chatNodeUtils.getLeafNode(prev),
        message
      )
    );

  const addTextToLastMessage: (text: string) => void = (text) =>
    setChatTree((prev) => {
      const target = chatNodeUtils.getLeafNode(prev) as ChatNode;

      if (isUndefined(target.nodeId)) return prev;

      return chatNodeUtils.addTextToAssistantContentById(
        prev,
        target.nodeId,
        text
      );
    });

  const chatAreaData = useMemo<ChatData>(
    () => chatNodeUtils.getChatAreaData(chatTree),
    [chatTree]
  );

  const isWhloeChatStreaming = useMemo<boolean>(
    () => chatNodeUtils.getIsWholeChatStreaming(chatTree),
    [chatTree]
  );

  const getIsStreaming = (nodeId: string) => {
    const target = chatNodeUtils.getNodeById(chatTree, nodeId);
    return !isNull(target) && target.isStreaming;
  };

  const setIsStreamingLeaf = (newValue: boolean) =>
    setChatTree((prev) => {
      const target = chatNodeUtils.getLeafNode(prev) as ChatNode;

      if (isUndefined(target.nodeId)) return prev;

      return chatNodeUtils.setIsStreamingById(prev, target.nodeId, newValue);
    });

  const isUserMessageLast = useMemo<boolean>(() => {
    const leaf = chatNodeUtils.getLeafNode(chatTree) as ChatNode;
    return !isUndefined(leaf.nodeId) && isNull(leaf.assistant);
  }, [chatTree]);

  const appendNewMessageBranch = (nodeId: string, message: string) =>
    setChatTree((prev) =>
      chatNodeUtils.appendNewChildById(prev, nodeId, message)
    );

  const getUserMessageBranchProps = (nodeId: string) => {
    const parent = chatNodeUtils.getParentById(chatTree, nodeId);

    return {
      selectedIndex: parent?.selectedChildIndex ?? 0,
      setSelectedIndex: (newIndex: number) =>
        isNull(parent)
          ? {}
          : setChatTree((prev) =>
              chatNodeUtils.setSelectedChildIndex(prev, parent, newIndex)
            ),
      childrenLength: parent?.children?.length ?? 0,
    };
  };

  return {
    chatAreaData,

    appendNewMessage,
    addTextToLastMessage,

    isWhloeChatStreaming,
    getIsStreaming,
    setIsStreamingLeaf,

    isUserMessageLast,

    appendNewMessageBranch,
    getUserMessageBranchProps,
  };
};

export default useChatTree;
