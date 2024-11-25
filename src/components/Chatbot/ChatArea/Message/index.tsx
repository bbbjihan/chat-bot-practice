import { Message as TMessage } from "@/types/data";
import { isUndefined } from "@/utils/typeNarrowFunctions";
import useChatbot from "../../useChatbot";
import GPTMessage from "./GPTMessage";
import UserMessage from "./UserMessage";

interface Props {
  message: TMessage;
  isStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id?: string;
  getUserMessageBranchProps?: ReturnType<
    typeof useChatbot
  >["chatAreaProps"]["getUserMessageBranchProps"];
}
const Message = ({
  message,
  isStreaming,
  appendNewMessageBranch,
  id,
  getUserMessageBranchProps,
}: Props) =>
  message.role === "user" &&
  !isUndefined(id) &&
  !isUndefined(getUserMessageBranchProps) ? (
    <UserMessage
      message={message}
      isStreaming={isStreaming}
      appendNewMessageBranch={appendNewMessageBranch}
      id={id}
      getUserMessageBranchProps={getUserMessageBranchProps}
    />
  ) : (
    <GPTMessage message={message} isStreaming={isStreaming} />
  );

export default Message;
