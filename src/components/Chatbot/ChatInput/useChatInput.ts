import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useState,
} from "react";
import { v4 } from "uuid";
import useChat from "../useChatbot";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const useChatInput = ({ appendNewMessage, isStreaming }: Props) => {
  const [chatUserInput, setChatUserInput] = useState<string>("");
  const resetChatUserInput = () => setChatUserInput("");

  const handleChatUserInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setChatUserInput(event.target.value);

  const submit = () => {
    if (isStreaming || !chatUserInput.trim()) return;

    appendNewMessage({
      id: v4(),
      role: "user",
      content: chatUserInput,
    });
    resetChatUserInput();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submit();
  };

  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
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
    handleKeyUp,
  };
};

export default useChatInput;
