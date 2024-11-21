import useChatData from "@/hooks/useChatData";

const useChatbot = () => {
  const { chatHistories, createNewChat, endStreaming, wholeChatStatus } =
    useChatData();

  const chatInputProps = { createNewChat, wholeChatStatus };
  const chatHistoriesProps = {
    chatHistories,
    endStreaming,
  };

  const isChatHistoriesEmpty = chatHistories.length === 0;
  return { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty };
};

export default useChatbot;
