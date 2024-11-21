import { Message as TMessage } from "@/types/data";
import GPTMessage from "./GPTMessage";
import UserMessage from "./UserMessage";

interface Props {
  message: TMessage;
  isStreaming: boolean;
}
const Message = ({ message, isStreaming }: Props) => {
  switch (message.role) {
    case "user":
      return <UserMessage message={message} />;
    case "assistant":
      return <GPTMessage message={message} isStreaming={isStreaming} />;
  }
};

export default Message;
