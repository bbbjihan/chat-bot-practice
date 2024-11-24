import { Message as TMessage } from "@/types/data";
import GPTMessage from "./GPTMessage";
import UserMessage from "./UserMessage";

interface Props {
  message: TMessage;
  isStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id?: string;
}
const Message = ({
  message,
  isStreaming,
  appendNewMessageBranch,
  id,
}: Props) => {
  switch (message.role) {
    case "user":
      return (
        <UserMessage
          message={message}
          isStreaming={isStreaming}
          appendNewMessageBranch={appendNewMessageBranch}
          id={id}
        />
      );
    case "assistant":
      return <GPTMessage message={message} isStreaming={isStreaming} />;
  }
};

export default Message;
