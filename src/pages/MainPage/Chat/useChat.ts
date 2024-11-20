import useChatHistory from "./ChatHistory/useChatHistory";
import useChatInput from "./ChatInput/useChatInput";

const useChat = () => {
  const { chatUserInput, handleChatUserInput, resetChatUserInput } =
    useChatInput();
  const { chatHistories } = useChatHistory();

  const submitChatUserInput = () => {
    resetChatUserInput();
  };

  const chatInputProps = {
    chatUserInput,
    handleChatUserInput,
    submitChatUserInput,
  };

  const chatHistoryProps = { chatHistories };

  return { chatInputProps, chatHistoryProps };
};

export default useChat;
