import { createNewStream, openStreamToString } from "@/utils/openAIUtils";
import { useEffect, useState } from "react";

interface Props {
  requestMessage: string;
  processChatStatus: () => void;
}
const useOpenAI = ({ requestMessage, processChatStatus }: Props) => {
  const [message, setMessage] = useState<string>("");

  const appendMessage = (message: string) =>
    setMessage((prev) => prev + message);

  const startStreaming = () => {
    createNewStream({ message: requestMessage }).then((stream) => {
      processChatStatus();

      openStreamToString({
        stream,
        appendToTarget: appendMessage,
        callback: processChatStatus,
      });
    });
  };

  useEffect(startStreaming, []);

  return {
    message,
  };
};

export default useOpenAI;
