import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import useChat from "../useChat";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const useChatInput = ({ createNewChat, wholeChatStatus }: Props) => {
  const [chatUserInput, setChatUserInput] = useState<string>("");
  const resetChatUserInput = () => setChatUserInput("");

  const handleChatUserInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setChatUserInput(event.target.value);

  const submit = () => {
    if (wholeChatStatus === "STREAMING" || !chatUserInput.trim()) return;

    createNewChat(chatUserInput);
    resetChatUserInput();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const isShiftKeyDown = event.shiftKey;
    if (isShiftKeyDown) {
      setChatUserInput((prev) => prev + "\n");
      return;
    }

    submit();
  };

  return {
    chatUserInput,
    handleChatUserInput,
    handleSubmit,
    handleKeyDown,
  };
};

export default useChatInput;
