import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import useChat from "./useChat";

const Chat = () => {
  const { chatInputProps, chatHistoryProps } = useChat();
  return (
    <>
      <ChatHistory {...chatHistoryProps} />
      <ChatInput {...chatInputProps} />
    </>
  );
};

export default Chat;
