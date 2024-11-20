import CustomInput from "@/components/CustomInput";
import useChat from "../useChat";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const ChatInput = ({ chatUserInput, handleChatUserInput }: Props) => {
  return (
    <>
      <CustomInput
        value={chatUserInput}
        onChange={handleChatUserInput}
        variant="outlined"
        multiline
      />
    </>
  );
};

export default ChatInput;
