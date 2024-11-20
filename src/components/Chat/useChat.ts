import useChatHistory from "./ChatHistory/useChatHistory";
import useChatInput from "./ChatInput/useChatInput";

const useChat = () => {
  const { chatUserInput, handleChatUserInput, resetChatUserInput } =
    useChatInput();
  const { chatHistories } = useChatHistory();

  const submitChatUserInput = () => {
    resetChatUserInput();
  };

  const isChatHistoryEmpty = chatHistories.length === 0;
  const chatInputProps = {
    chatUserInput,
    handleChatUserInput,
    submitChatUserInput,
    isChatHistoryEmpty,
  };
  const chatHistoryProps = { chatHistories, isChatHistoryEmpty };

  return { chatInputProps, chatHistoryProps };
};

export default useChat;
