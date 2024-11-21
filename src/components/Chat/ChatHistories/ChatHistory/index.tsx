import { Chat } from "@/types/data";
import ChatHistoryGPT from "./ChatHistoryGPT";
import ChatHistoryUser from "./ChatHistoryUser";

interface Props {
  chat: Chat;
  chatHistories: Array<Chat>;
  endStreaming: (chatId: string, responseMessage: string) => void;
}
const ChatHistory = ({ chat, chatHistories, endStreaming }: Props) => {
  return (
    <>
      <ChatHistoryUser message={chat.request.message} />
      <ChatHistoryGPT
        chatHistories={chatHistories}
        chatId={chat.id}
        isStreaming={chat.status === "STREAMING"}
        endStreaming={endStreaming}
      />
    </>
  );
};

export default ChatHistory;
