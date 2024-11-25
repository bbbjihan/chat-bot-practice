import { Message as TMessage } from "@/types/data";
import { isUndefined } from "@/utils/typeNarrowFunctions";
import useChatbot from "../../useChatbot";
import GPTMessage from "./GPTMessage";
import UserMessage from "./UserMessage";

interface Props {
  message: TMessage;
  isWhloeChatStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id?: string;
  getUserMessageBranchProps?: ReturnType<
    typeof useChatbot
  >["chatAreaProps"]["getUserMessageBranchProps"];
}
const Message = ({
  message,
  isWhloeChatStreaming,
  appendNewMessageBranch,
  id,
  getUserMessageBranchProps,
}: Props) =>
  message.role === "user" &&
  !isUndefined(id) &&
  !isUndefined(getUserMessageBranchProps) ? (
    <UserMessage
      message={message}
      isStreaming={isWhloeChatStreaming}
      appendNewMessageBranch={appendNewMessageBranch}
      id={id}
      getUserMessageBranchProps={getUserMessageBranchProps}
    />
  ) : (
    <GPTMessage message={message} />
  );

export default Message;
