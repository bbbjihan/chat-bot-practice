import { AssistantMessage, ChatData, Message, UserMessage } from "@/types/data";
import { isNull } from "./typeNarrowFunctions";

export interface ChatNode {
  user: UserMessage;
  assistant: AssistantMessage | null;
  children: Array<ChatNode>;
  selectedChildIndex: number | null;
  isStreaming: boolean;
}

interface ChatNodeUtils {
  constructNode: (message: string) => ChatNode;
  getSelectedChild: (chatNode: ChatNode) => ChatNode | null;
  getLeafNode: (head: ChatNode) => ChatNode;

  createNewChat: (head: ChatNode, message: string) => ChatNode;
  setIsStreamingLeaf: (head: ChatNode, newValue: boolean) => ChatNode;

  addTextToLeafAssistantContent: (head: ChatNode, text: string) => ChatNode;

  getisWholeChatStreaming: (head: ChatNode) => boolean;
  getChatAreaData: (head: ChatNode) => ChatData;
}

const chatNodeUtils: ChatNodeUtils = {
  constructNode: (message) => ({
    user: { role: "user", content: message },
    assistant: null,
    children: [],
    selectedChildIndex: null,
    isStreaming: false,
  }),

  getSelectedChild: (chatNode) =>
    !isNull(chatNode.selectedChildIndex) &&
    chatNode.children.length > chatNode.selectedChildIndex
      ? chatNode.children[chatNode.selectedChildIndex]
      : null,

  getLeafNode: (head) => {
    let cur = head;
    let child = chatNodeUtils.getSelectedChild(head);

    while (!isNull(child)) {
      cur = child;
      child = chatNodeUtils.getSelectedChild(cur);
    }

    return cur;
  },

  createNewChat: (head, message) => {
    const newHead = structuredClone(head);
    const leaf = chatNodeUtils.getLeafNode(newHead);

    const newNode = chatNodeUtils.constructNode(message);

    leaf.children.push(newNode);
    leaf.selectedChildIndex = leaf.children.length - 1;

    return newHead;
  },

  setIsStreamingLeaf: (head, newValue) => {
    const newHead = structuredClone(head);
    const leaf = chatNodeUtils.getLeafNode(newHead);

    leaf.isStreaming = newValue;

    return newHead;
  },

  addTextToLeafAssistantContent: (head, text) => {
    const newHead = structuredClone(head);
    const leaf = chatNodeUtils.getLeafNode(newHead);

    leaf.assistant = {
      role: "assistant",
      content: isNull(leaf.assistant) ? text : leaf.assistant.content + text,
    };

    return newHead;
  },

  getisWholeChatStreaming: (head) => {
    if (head.isStreaming) return true;

    let cur: ChatNode | null = head;
    while (!isNull(cur)) {
      cur = chatNodeUtils.getSelectedChild(cur);
      if (cur?.isStreaming) return true;
    }

    return false;
  },

  getChatAreaData: (head) => {
    const messages: Array<Message> = [];

    let cur: ChatNode | null = head;
    while (!isNull(cur)) {
      messages.push(cur.user);

      if (isNull(cur.assistant)) break;
      messages.push(cur.assistant);
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return messages;
  },
};

export default chatNodeUtils;
