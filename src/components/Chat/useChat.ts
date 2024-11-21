import useChatHistories from "./ChatHistories/useChatHistories";

const useChat = () => {
  const { chatHistories, createNewChat } = useChatHistories();

  const chatInputProps = { createNewChat };
  const chatHistoriesProps = { chatHistories };

  const isChatHistoriesEmpty = chatHistories.length === 0;
  return { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty };
};

export default useChat;
