import { AssistantMessage, ChatData, Message, UserMessage } from "@/types/data";
import { v4 } from "uuid";
import { isNull } from "./typeNarrowFunctions";

export interface ChatTree {
  children: Array<ChatNode>;
  selectedChildIndex: number | null;
}

export interface ChatNode {
  nodeId: string;
  user: UserMessage;
  assistant: AssistantMessage | null;
  children: Array<ChatNode>;
  selectedChildIndex: number | null;
  isStreaming: boolean;
}

interface ChatNodeUtils {
  createNewTree: () => ChatTree;
  createNewNode: (message: string) => ChatNode;

  getSelectedChild: (target: ChatNode | ChatTree) => ChatNode | null;
  getNodeById: (tree: ChatTree, nodeId: string) => ChatNode | null;
  getParentById: (tree: ChatTree, nodeId: string) => ChatNode | ChatTree | null;
  getIsWholeChatStreaming: (tree: ChatTree) => boolean;
  getChatAreaData: (tree: ChatTree) => ChatData;

  addTextToAssistantContentById: (
    tree: ChatTree,
    nodeId: string,
    text: string
  ) => ChatTree;
  appendNewChildById: (
    tree: ChatTree,
    nodeId: string,
    message: string
  ) => ChatTree;
  setIsStreamingById: (
    tree: ChatTree,
    nodeId: string,
    newValue: boolean
  ) => ChatTree;
}

const chatNodeUtils: ChatNodeUtils = {
  createNewTree: () => ({
    children: [],
    selectedChildIndex: null,
  }),
  createNewNode: (message) => ({
    nodeId: v4(),
    user: { role: "user", content: message },
    assistant: null,
    children: [],
    selectedChildIndex: null,
    isStreaming: false,
  }),

  getSelectedChild: (target) =>
    isNull(target.selectedChildIndex)
      ? null
      : target.children[target.selectedChildIndex],
  getNodeById: (tree, nodeId) => {
    let cur: ChatNode | null = chatNodeUtils.getSelectedChild(tree);

    while (!isNull(cur)) {
      if (cur.nodeId === nodeId) return cur;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return null;
  },
  getParentById: (tree, nodeId) => {
    let parent: ChatNode | null = null;
    let cur: ChatNode | null = chatNodeUtils.getSelectedChild(tree);

    while (!isNull(cur)) {
      if (cur.nodeId === nodeId) break;
      parent = cur;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    if (isNull(cur)) return null;
    if (isNull(parent)) return tree;
    return parent;
  },
  getIsWholeChatStreaming: (tree) => {
    let cur: ChatNode | null = chatNodeUtils.getSelectedChild(tree);
    while (!isNull(cur)) {
      if (cur.isStreaming === true) return true;
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return false;
  },
  getChatAreaData: (tree) => {
    const messages: Array<Message> = [];

    let cur: ChatNode | null = chatNodeUtils.getSelectedChild(tree);
    while (!isNull(cur)) {
      messages.push({ ...cur.user, id: cur.nodeId });

      if (isNull(cur.assistant)) break;
      messages.push(cur.assistant);
      cur = chatNodeUtils.getSelectedChild(cur);
    }

    return messages;
  },

  addTextToAssistantContentById: (tree, nodeId, text) => {
    const newTree = structuredClone(tree);
    const target = chatNodeUtils.getNodeById(newTree, nodeId);
    if (isNull(target)) return newTree;

    target.assistant = {
      role: "assistant",
      content: isNull(target.assistant)
        ? text
        : target.assistant.content + text,
    };

    return newTree;
  },
  appendNewChildById: (tree, nodeId, message) => {
    const newTree = structuredClone(tree);

    const target = chatNodeUtils.getParentById(newTree, nodeId);
    if (isNull(target)) return newTree;

    target.children.push(chatNodeUtils.createNewNode(message));
    target.selectedChildIndex = target.children.length - 1;

    return newTree;
  },
  setIsStreamingById: (tree, nodeId, newValue) => {
    const newTree = structuredClone(tree);

    const target = chatNodeUtils.getNodeById(newTree, nodeId);
    if (isNull(target)) return newTree;

    target.isStreaming = newValue;

    return newTree;
  },
};

export default chatNodeUtils;
