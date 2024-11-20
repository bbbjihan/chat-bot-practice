import { ChangeEventHandler, useState } from "react";

const useChatInput = () => {
  const [chatUserInput, setChatUserInput] = useState<string>("");

  const handleChatUserInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setChatUserInput(event.target.value);

  const resetChatUserInput = () => setChatUserInput("");

  return {
    chatUserInput,
    handleChatUserInput,
    resetChatUserInput,
  };
};

export default useChatInput;
