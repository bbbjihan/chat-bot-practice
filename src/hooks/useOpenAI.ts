import { Message } from "@/types/data";
import { createNewStream, openStreamToString } from "@/utils/openAIUtils";

const useOpenAI = () => {
  const startStreamingMessage = ({
    messages,
    addTextToTarget,
    callback,
  }: {
    messages: Array<Message>;
    addTextToTarget: (text: string) => void;
    callback?: () => void;
  }) => {
    createNewStream({ messages }).then((stream) => {
      openStreamToString({
        stream,
        addTextToTarget,
        callback,
      });
    });
  };

  return {
    startStreamingMessage,
  };
};

export default useOpenAI;
