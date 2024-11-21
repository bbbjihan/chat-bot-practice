import { Chat } from "@/types/data";
import GPTMessage from "./GPTMessage";
import UserMessage from "./UserMessage";

interface Props {
  chat: Chat;
  chatHistories: Array<Chat>;
  endStreaming: (chatId: string, responseMessage: string) => void;
}
const ChatMessagePair = ({ chat, chatHistories, endStreaming }: Props) => {
  return (
    <>
      <UserMessage message={chat.request.message} />
      <GPTMessage
        chatHistories={chatHistories}
        chatId={chat.id}
        isStreaming={chat.status === "STREAMING"}
        endStreaming={endStreaming}
      />
    </>
  );
};

export default ChatMessagePair;
