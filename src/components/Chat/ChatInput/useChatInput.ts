import { ChangeEventHandler, FormEventHandler, useState } from "react";
import useChat from "../useChat";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const useChatInput = ({ createNewChat, wholeChatStatus }: Props) => {
  const [chatUserInput, setChatUserInput] = useState<string>("");
  const resetChatUserInput = () => setChatUserInput("");

  const handleChatUserInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setChatUserInput(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (wholeChatStatus === "STREAMING" || chatUserInput.length === 0) return;

    createNewChat(chatUserInput);
    resetChatUserInput();
  };

  return {
    chatUserInput,
    handleChatUserInput,
    handleSubmit,
  };
};

export default useChatInput;
