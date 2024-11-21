import { Message } from "@/types/data";
import {
  createNewStreamWithController,
  openStreamToString,
} from "@/utils/openAIUtils";
import { useRef } from "react";

const useOpenAI = () => {
  const abortStreaming = useRef<() => void>(() => {});

  const startStreamingMessage = async ({
    messages,
    addTextToTarget,
    callback,
  }: {
    messages: Array<Message>;
    addTextToTarget: (text: string) => void;
    callback?: () => void;
  }) => {
    const { stream, abort } = await createNewStreamWithController({ messages });

    abortStreaming.current = abort;
    openStreamToString({
      stream,
      addTextToTarget,
      callback,
    });
  };

  return {
    startStreamingMessage,
    abortStreaming,
  };
};

export default useOpenAI;
