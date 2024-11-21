import { Chat } from "@/types/data";
import ChatHistoryGPT from "./ChatHistoryGPT";
import ChatHistoryUser from "./ChatHistoryUser";

interface Props {
  chat: Chat;
}
const ChatHistory = ({ chat }: Props) => {
  return (
    <>
      <ChatHistoryUser message={chat.request.message} />
      <ChatHistoryGPT
        requestMessage={chat.request.message}
        isStreaming={chat.status === "STREAMING"}
      />
    </>
  );
};

export default ChatHistory;
