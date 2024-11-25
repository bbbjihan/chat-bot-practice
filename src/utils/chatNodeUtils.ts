import { AssistantMessage, ChatData, Message, UserMessage } from "@/types/data";
import { v4 } from "uuid";
import { isNull, isUndefined } from "./typeNarrowFunctions";

export interface ChatNode {
  id: string;
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

  getNodeById: (head: ChatNode | null, nodeId: string) => ChatNode | null;
  getParentById: (
    head: ChatNode | null,
    nodeId: string
  ) => ChatNode | null | undefined;
  appendNewChild: (
    head: ChatNode,
    nodeId: string,
    message: string
  ) => ChatNode | undefined;
}

const chatNodeUtils: ChatNodeUtils = {
  constructNode: (message) => ({
    id: v4(),
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
    let cur: ChatNode | null = head;
    while (!isNull(cur)) {
      if (cur.isStreaming === true) return true;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return false;
  },

  getChatAreaData: (head) => {
    const messages: Array<Message> = [];

    let cur: ChatNode | null = head;
    while (!isNull(cur)) {
      messages.push({ ...cur.user, id: cur.id });

      if (isNull(cur.assistant)) break;
      messages.push(cur.assistant);
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return messages;
  },

  getNodeById: (head, nodeId) => {
    let cur: ChatNode | null = head;
    while (!isNull(cur)) {
      if (cur.id === nodeId) return cur;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return null;
  },

  getParentById: (head, nodeId) => {
    let parent: ChatNode | null = null;
    let cur: ChatNode | null = head;

    while (!isNull(cur)) {
      if (cur.id === nodeId) break;
      parent = cur;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    if (isNull(cur)) return null;
    if (isNull(parent)) return;
    return parent;
  },

  appendNewChild: (head, nodeId, message) => {
    const newHead = structuredClone(head);

    const target = chatNodeUtils.getParentById(newHead, nodeId);
    if (isNull(target)) return;
    if (isUndefined(target)) return chatNodeUtils.constructNode(message);

    target.children.push(chatNodeUtils.constructNode(message));
    target.selectedChildIndex = target.children.length - 1;

    return newHead;
  },
};

export default chatNodeUtils;
