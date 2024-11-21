import useChatHistories from "./ChatHistories/useChatHistories";

const useChat = () => {
  const { chatHistories, createNewChat, processChatStatus, wholeChatStatus } =
    useChatHistories();

  const chatInputProps = { createNewChat, wholeChatStatus };
  const chatHistoriesProps = {
    chatHistories,
    processChatStatus,
  };

  const isChatHistoriesEmpty = chatHistories.length === 0;
  return { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty };
};

export default useChat;
