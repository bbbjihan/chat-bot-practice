import { Chat } from "@/types/data";
import ChatHistoryGPT from "./ChatHistoryGPT";
import ChatHistoryUser from "./ChatHistoryUser";

interface Props {
  chat: Chat;
  processChatStatus: (chatId: string) => void;
}
const ChatHistory = ({ chat, processChatStatus }: Props) => {
  const processChatStatusById = () => processChatStatus(chat.id);

  return (
    <>
      <ChatHistoryUser message={chat.request.message} />
      <ChatHistoryGPT
        requestMessage={chat.request.message}
        isStreaming={chat.status === "STREAMING"}
        processChatStatus={processChatStatusById}
      />
    </>
  );
};

export default ChatHistory;
