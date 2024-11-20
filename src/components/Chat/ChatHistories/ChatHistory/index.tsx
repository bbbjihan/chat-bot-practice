import { Chat } from "@/types/data";
import ChatHistoryGPT from "./ChatHistoryGPT";
import ChatHistoryUser from "./ChatHistoryUser";

interface Props {
  history: Chat;
}
const ChatHistory = ({ history }: Props) => {
  switch (history.sender) {
    case "GPT":
      return <ChatHistoryGPT chat={history} />;
    case "USER":
      return <ChatHistoryUser chat={history} />;
  }
};

export default ChatHistory;
