import { debounce } from "@mui/material";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useState,
} from "react";
import useChat from "../useChatbot";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const useChatInput = ({
  appendNewMessage,
  isStreaming,
  abortStreaming,
}: Props) => {
  const [chatUserInput, setChatUserInput] = useState<string>("");
  const resetChatUserInput = () => setChatUserInput("");

  const handleChatUserInput: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => setChatUserInput(event.target.value);

  const submit = useCallback(() => {
    if (isStreaming || !chatUserInput.trim()) return;

    appendNewMessage(chatUserInput);
    resetChatUserInput();
  }, [isStreaming, chatUserInput, appendNewMessage]);

  const debouncedSubmit = useMemo(
    () =>
      debounce((event: React.KeyboardEvent) => {
        if (event.key !== "Enter") return;
        const isShiftKeyDown = event.shiftKey;
        if (isShiftKeyDown) {
          setChatUserInput((prev) => prev + "\n");
          return;
        }

        submit();
      }, 200),
    [submit]
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    submit();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }

    debouncedSubmit(event);
  };

  const handleStop = abortStreaming.current;

  return {
    chatUserInput,
    handleChatUserInput,
    handleSubmit,
    handleKeyDown,
    handleStop,
  };
};

export default useChatInput;
